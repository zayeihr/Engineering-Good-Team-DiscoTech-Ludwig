
# Ludwig - Singlish Speech To Text using Tacotron2

This project demonstrates the fine-tuning of a TTS model for Singlish speech synthesis using Mozilla's implementation of Tacotron2. The application includes a React frontend for user interaction and Python-based Flask backend services for audio preprocessing, speaker selection, and model training. This data science project is part of an initiative to develop a multi-language Singlish text-to-speech (and vice-versa) web app platform, named Ludwig, aimed at aiding the d/Deaf community. I led a team of five as a voluntary team engineer in Team Discotech. Our project was selected to be featured at Engineering Good's annual Tech For Good Festival 2022. My responsibilities included collecting training data both manually through the mimic recording studio and through IMDA’s National Speech Corpus, and subsequently pre-training and fine-tuning our speech recognition model using PyTorch.

The data pipeline and  included notebooks involve the fine tuning of a TSS model for a local language/accent ([Singlish](https://en.wikipedia.org/wiki/Singlish)). The data pipeline utilizes audio/transcript data from the [IMDA National Speech Corpus](https://www.imda.gov.sg/NationalSpeechCorpus) and using [Mozilla's implementation of Tacotron2](https://github.com/mozilla/TTS).

## Pre-requisites

To run this application you should first:

- Request access to the [IMDA National Speech Corpus](https://www.imda.gov.sg/NationalSpeechCorpus)
- Deploy a GPU enabled [Pachyderm](https://pachyderm.io/) cluster or create a cluster in the hosted [Pachyderm:Hub](https://hub.pachyderm.com/clusters) (The pipeline has been tested with V100 and K80 GPUs on Google Cloud)
- [Install `pachctl` locally](https://docs.pachyderm.com/latest/getting_started/local_installation/#install-pachctl) and connect it to your Pachyderm cluster
- Install Docker and ensure it's running
- Install Node.js and npm from nodejs.org

## Setup and Installation

## Frontend

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.


## Backend

Pachyderm data pipelines utilize a versioned data storage layer backed by an object store. Data is organized into "data repositories" (repos) in this storage layer. To utilize the IMDA corpus in our data pipeline, we need to create an input repo, `corpus`, for this data and upload the data into the repo. For this example deploy, we will just be using `PART2` of the IMDA National Speech Corpus. Once created, your input repository should look like the following:

```sh
$ pachctl list file corpus@master:/
NAME           TYPE SIZE
/SCRIPT        dir  79.4MiB
/WAVE          dir  86.83GiB
/speakers.XLSX file 59.98KiB

$ pachctl list file corpus@master:/WAVE | head
NAME                  TYPE SIZE
/WAVE/SPEAKER2001.zip file 87.08MiB
/WAVE/SPEAKER2002.zip file 93.38MiB
/WAVE/SPEAKER2003.zip file 76.99MiB
/WAVE/SPEAKER2005.zip file 36.53MiB
/WAVE/SPEAKER2006.zip file 61.53MiB
/WAVE/SPEAKER2007.zip file 92.24MiB
/WAVE/SPEAKER2008.zip file 81.92MiB
/WAVE/SPEAKER2009.zip file 65.67MiB
/WAVE/SPEAKER2010.zip file 76.23MiB

$ pachctl list file corpus@master:/SCRIPT | head
NAME               TYPE SIZE
/SCRIPT/020010.TXT file 43.46KiB
/SCRIPT/020011.TXT file 43.91KiB
/SCRIPT/020020.TXT file 41.75KiB
/SCRIPT/020021.TXT file 40.09KiB
/SCRIPT/020030.TXT file 44.02KiB
/SCRIPT/020031.TXT file 40.5KiB
/SCRIPT/020050.TXT file 42.06KiB
/SCRIPT/020060.TXT file 34.96KiB
/SCRIPT/020061.TXT file 36.68KiB
```  

## 2. Select a speaker and pre-process the corresponding data

We will be fine-tuning an existing TTS model from Mozilla and thus we won't need as much data as we would if we were training from scratch. As such, we will just be selecting the audio and transcript files out of the IMDA corpus that correspond to a particular speaker. The IMDA corpus includes many male and female speakers with Chinese, Indian, and Malay accents. For our example we will utilize a female speaker with an Indian accent. 

The [`speaker_select.py` Python script](speaker_select/speaker_select.py) performs the necessary filtering of the corpus. It also reformat's IMDA's metadata and transcript information into [LJSpeech](https://keithito.com/LJ-Speech-Dataset/) format. We utilize the LJSpeech format because we will be using an base model trained on LJSpeech and because Mozilla's TTS implementation already has a pre-processor for LJSpeech formatted data.   



## 3. Train the TTS model

The data is now ready for training. We will utilize [Mozilla's implementation of Tacotron2](https://github.com/mozilla/TTS) to perform our training and inference. We will also start from [one of their pre-trained models](https://github.com/mozilla/TTS/wiki/Released-Models) as our base model (which will reduce training time drastically).

We will need the [config file](config.json) for training, so let's go ahead and upload that into a Pachdyerm repo:

```sh
$ pachctl create repo config

$ pachctl put file config@master:/config.json -f config.json

$ pachctl list file config@master:/config.json
NAME         TYPE SIZE
/config.json file 4.619KiB
```

Then we can start training by creating the `train_tts` pipeline with the [`train_tts.json` pipeline specification](train_tts.json):

```sh
$ pachctl create pipeline -f train_tts.json

$ pachctl list job --no-pager --pipeline train_tts

$ pachctl list job --no-pager --pipeline train_tts
ID                               PIPELINE  STARTED     DURATION RESTART PROGRESS  DL UL STATE
d34b3035736d48a98536365d19e76edf train_tts 5 hours ago -        0       0 + 0 / 1 0B 0B running
``` 

Once that finishes running, you should be able to view and download the checkpoints from the `train_tts` repo (the output repo from the `train_tts` pipeline):

```sh
$ bleh
```sh

## References

- [Mozilla TTS (Tacotron2) Implementation](https://github.com/mozilla/TTS)
- [Pachyderm](https://pachyderm.io/) 
- [Tacotron2 Paper](https://arxiv.org/abs/1712.05884) 
- [WaveNet Blog Post](https://deepmind.com/blog/article/wavenet-generative-model-raw-audio) 
- [SIL](https://www.sil.org/) 
- [Wordly](https://wordly.sg/) 
- [IMDA Singlish Corpus](https://www.imda.gov.sg/NationalSpeechCorpus) 
- [SIL International AI](https://github.com/sil-ai/tts-singlish)

