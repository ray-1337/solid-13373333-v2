import { Component, createSignal, onMount } from "solid-js";

import "./Base.css";
import style from "./Index.module.css";

const FileUploader: Component = () => {
  let uploadProgress!: HTMLElement;
  let uploadResult!: HTMLElement;
  let uploadReady!: HTMLElement;

  const allowedMimeType = ["image/jpg", "image/jpeg", "image/png", "image/webp", "video/mp4", "video/mpeg", "video/webm", "image/gif"];
  
  onMount(() => {
    uploadReady.classList.add(style.phased);

    document.title = "personal file storage.";
  });

  // percentage control
  let [uploadTitle, setUploadTitle] = createSignal<string>("");
  let [uploadPercentage, setUploadPercentage] = createSignal<number>(0);
  let [uploadURL, setUploadURL] = createSignal<string>("");

  let dedicatedFileElement!: HTMLLabelElement;
  
  function dedicatedFileChange(res: Event) {
    const target = res.target as HTMLInputElement;
    const currentFile = target?.files?.[0];
    if (!currentFile) {
      removeFileFromFileList();
      return alert("Unknown current file.");
    };

    const maxMB = 100;
    const maxFileMB = Math.round(maxMB * 1024 * 1024);
    if (currentFile.size >= maxFileMB) {
      removeFileFromFileList();
      return alert(`File size must be less than ${maxMB} MB.`);
    };

    uploadReady.classList.remove(style.phased);
    uploadProgress.classList.add(style.phased);
    if (uploadResult.classList.contains(style.phased)) {
      uploadResult.classList.remove(style.phased);
    };

    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://13373333.one/3333/file/');
    xhr.responseType = 'text';

    window.onbeforeunload = (evt) => {
      evt = evt || window.event;
      console.log(evt);
  
      if (evt) {
        evt.returnValue = 'Yeah, I know, just close it.';
        if (xhr) xhr.abort();
        setUploadTitle("Upload aborted.");
        setUploadPercentage(0);
        uploadReady.classList.add(style.phased);
      };
  
      return 'Are you sure about that?';
    };
    
    xhr.upload.onprogress = (evt) => {
      if (evt.lengthComputable) {
        let progressPercent = Math.floor((evt.loaded / evt.total) * 100);

        setUploadTitle(`[${formatBytes(evt.loaded)} / ${formatBytes(evt.total)}]`);
        setUploadPercentage(progressPercent);
      };
    };

    function clearAfterwards() {
      uploadProgress.classList.remove(style.phased);
      uploadReady.classList.add(style.phased);
      setUploadTitle(`[${formatBytes(0)} / ${formatBytes(0)}]`);
      setUploadPercentage(0);
      removeFileFromFileList();
      window.onbeforeunload = () => {};
    };

    xhr.onreadystatechange = function() {
      if (xhr.status === 200 && xhr.readyState === 4) {
        console.log("Finished:", xhr.response);

        uploadResult.classList.add(style.phased);
        setUploadURL(xhr.response);
        
        clearAfterwards();
      };
      
      if (xhr.status >= 400) {
        console.log("Error:", xhr.response);
        alert(`An error occurred: ${xhr.response}`);

        clearAfterwards();
      };
    };

    let form = new FormData();
    form.append('content', currentFile);
    xhr.send(form);

    function removeFileFromFileList(index?: number) {
      const dt = new DataTransfer();
      const input = dedicatedFileElement as unknown as HTMLInputElement;
      const { files } = input;
      if (!files?.length) return;
      
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if ((index || 0) !== i) dt.items.add(file);
      };
      
      input.files = dt.files;
    };
  };

  return (
    <div class={style.main}>
      <section class={style.title}>
        <h1>13373333: Personal File Storage.</h1>
      </section>

      <section class={style.description}>
        <p>It's my private file storage (mainly for media purposes), but you can use it too, so whatever.</p>
        <p>You can upload the file up to <b>100 MB</b>.</p>
        <p>Any file will be uploaded to my private cloud, and those files will remain forever.</p>
        <p>You can ask me for file deletion, if you want, easy as that.</p>
      </section>

      <section class={style.upload}>
        <section class={style.ready} ref={(evt) => uploadReady = evt}>
          <form enctype="multipart/form-data" method="post">
            <label for="fileUploadDedicated" ref={(evt) => dedicatedFileElement = evt} class={style.uploadButton}>Upload File</label>

            {/* <button class="uploadButton" type="button" wonder="urls" disabled aria-disabled="true">Through URLs</button> */}

            <input id="fileUploadDedicated" type="file" name="files[]" accept={allowedMimeType.join(",")} onChange={(evt) => dedicatedFileChange(evt)}/>
            <input type="submit" value="Submit"/>
          </form>
        </section>

        <section class={style.progress} ref={(evt) => uploadProgress = evt}>
          <p innerHTML={uploadTitle()}></p>
          
          <span class={style.bar} style={{width: `${uploadPercentage()}%`}}></span>
        </section>

        <section class={style.result} ref={(evt) => uploadResult = evt}>
          <p>{uploadURL()}</p>

          <button class={style.copyURLs} type="button" onClick={() => {
            navigator.clipboard.writeText(uploadURL());
            alert("Copied.");
          }}>Copy</button>
        </section>
      </section>
    </div>
  );
};

export default FileUploader;

function formatBytes(bytes: number, decimals?: number) {
  if (bytes == 0) return '0 Bytes';
  let k = 1024,
      dm = decimals || 2,
      sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
      i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
};