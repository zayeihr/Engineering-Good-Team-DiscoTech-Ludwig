from flask import Flask, request, jsonify
import os
from os import listdir
from os.path import isfile, join
import zipfile
import shutil
import pandas as pd

app = Flask(__name__)

@app.route('/speaker_select', methods=['POST'])
def speaker_select():
    args = request.json
    docfile = args['docfile']
    gender = args['gender']
    acc = args['acc']
    scriptdir = args['scriptdir']
    wavdir = args['wavdir']
    numspeakers = args['numspeakers']
    outdir = args['outdir']

    speakers = pd.read_excel(docfile, index_col=None)
    speakers = speakers[speakers['SEX'] == gender]
    speakers = speakers[speakers['ACC'] == acc]
    speaker_ids = [str(x) for x in speakers['SCD/PART2'].unique().tolist()]
    speaker_ids = speaker_ids[0:numspeakers]

    scripts = [f for f in listdir(scriptdir) if isfile(join(scriptdir, f))]
    filtered_scripts = []
    for s in scripts:
        if s[1:5] in speaker_ids:
            filtered_scripts.append(s)

    out_wavs = []
    for s in filtered_scripts:
        with open(join(scriptdir, s), "r") as f:
            prev_line = ""
            wav_file = ""
            punc = ""
            for line in f:
                line = line.strip()
                if line[0].isdigit():
                    wav_file = line[0:9]
                    transcription = line[9:].strip()
                    prev_line = line
                    if line[-1] == '.' or line[-1] == '?':
                        punc = line[-1]
                    else:
                        punc = ""
                else:
                    if "**" not in line and "/>" not in line and wav_file != "":
                        out_wavs.append(wav_file + '|' + transcription + '|' + line + punc)

    with open(join(outdir, "metadata.csv"), "w") as meta_file:
        for line in out_wavs:
            meta_file.write(line+"\n")

    for idx in speaker_ids:
        os.symlink(join(wavdir, 'SPEAKER' + idx + '.zip'), join(outdir, 'SPEAKER' + idx + '.zip'))

    return jsonify({"status": "success", "message": "Speaker selection complete"})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)
