from flask import Flask, request, jsonify
import os
from os import listdir
from os.path import isfile, join
import zipfile
import shutil

app = Flask(__name__)

mypath = '/pfs/speaker_select/'
outdir = '/pfs/out'

@app.route('/prep_audio', methods=['POST'])
def prep_audio():
    onlyfiles = [f for f in listdir(mypath) if isfile(join(mypath, f))]
    for f in onlyfiles:
        if "zip" in f:
            with zipfile.ZipFile(join(mypath, f), 'r') as zip_ref:
                zip_ref.extractall('.')
                for folder in ['SESSION0', 'SESSION1']:
                    try:
                        src_files = os.listdir(join(f[0:-4], folder))
                    except:
                        continue
                    for file_name in src_files:
                        full_file_name = os.path.join(f[0:-4], folder, file_name)
                        try:
                            os.mkdir(join(outdir, "wavs"))
                        except:
                            pass
                        if os.path.isfile(full_file_name):
                            shutil.copy(full_file_name, join(outdir, "wavs", file_name[0:-4] + ".wav"))
                shutil.rmtree(f[0:-4])
    return jsonify({"status": "success", "message": "Audio prepped"})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
