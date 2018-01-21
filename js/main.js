(function () {
    'use strict';
    let width = 500, height = 0, filter = 'none', streaming = false;

    const video = document.getElementById('video');
    const canvas = document.getElementById('canvas');
    const photos = document.getElementById('photos');
    const photoButton = document.getElementById('photo-button');
    const clear = document.getElementById('clear-button');
    const photoFilter = document.getElementById('photo-filter');

    //access webcam
    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        .then((stream) => {
            video.srcObject = stream;
            video.play();
        })
        .catch((err) => {
            console.error(err);
        })


    //Play when ready
    video.addEventListener('canplay', function (e) {
        if (!streaming) {
            height = video.videoHeight / (video.videoWidth / width);
            video.setAttribute('width', width);
            video.setAttribute('height', height);
            canvas.setAttribute('width', width);
            canvas.setAttribute('height', height);
            streaming = true;
        }
    }, false);

    function takePicture() {
        //create canvas
        const context = canvas.getContext('2d');
        if (width && height) {
            canvas.width = width;
            canvas.height = height;
            //draw a picture
            context.drawImage(video, 0, 0, width, height);

            //create image from canvas
            const imgUrl = canvas.toDataURL('image/png');

            //create image element
            const img = document.createElement('img');
            img.setAttribute('src', imgUrl);

            //set image filter
            img.style.filter = filter;
            //add image to photos
            photos.appendChild(img);
        }
    }

    photoFilter.addEventListener('change', function (e) {
        filter = e.target.value;
        //set filter to video
        video.style.filter = filter;
        e.preventDefault();

    }, false);

    photoButton.addEventListener('click', function (e) {
        takePicture();
        e.preventDefault();
    }, false);

    clear.addEventListener('click', function (e) {
        //clear all the phots
        photos.innerHTML = '';
        filter = 'none';
        video.style.filter = filter;
        photoFilter.selectedIndex = 0;
    }, false)

})();