document.addEventListener("DOMContentLoaded", (event) => {
  // ここに今までのJavaScriptのコードを移動
  const video = document.getElementById("video");
  // const outputDiv = document.getElementById("output");
  const captureButton = document.getElementById("captureButton");
  const politician = document.querySelector(".politician");
  const modalBack = document.querySelector(".modal-back");
  const politician__explanation = document.querySelector(
    ".politician__explanation"
  );
  const politician__name = document.querySelector(".politician__name");
  const affiliation = document.querySelector(".affiliation");
  const politician__link = document.querySelector(".politician__link");
  const politicianClose = document.querySelector(".politician__close");
  const politicianScrollBar = document.querySelector(".plitician__scroll-bar");
  const age = document.querySelector(".age");
  const shotBox = document.querySelector(".shot__image-box");

  const changeSub = (obj) => {
    politician__name.textContent = obj.name[obj.name.length - 1];
    politician__explanation.textContent =
      obj.description[obj.description.length - 1];
    age.textContent = `${obj.age[obj.age.length - 1]}歳`;
    affiliation.textContent = obj.affiliation[obj.affiliation.length - 1];
    politician__link.setAttribute("href", obj.link[obj.link.length - 1]);
  };

  const deleteSub = () => {
    politician__name.textContent = "";
    politician__explanation.textContent = "";
    age.textContent = "";
    affiliation.textContent = "";
    politician__link.setAttribute("href", "#");
  };

  navigator.mediaDevices
    .getUserMedia({
      video: {
        facingMode: "environment",
      },
    })
    .then((stream) => {
      video.srcObject = stream;
      video.play();
    })
    .catch((err) => {
      console.error("Error accessing the camera", err);
    });

  // モーダル非表示処理
  const modalClose = () => {
    politician.classList.toggle("active");
    if (modalBack.classList.contains("active")) {
      modalBack.classList.add("none");
      modalBack.classList.remove("active");
    } else {
      modalBack.classList.add("active");
      modalBack.classList.remove("none");
    }
    const shotImage = document.querySelector(".shot__image");
    shotImage.remove();
  };
  politicianClose.addEventListener("click", () => {
    modalClose();
  });
  modalBack.addEventListener("click", () => {
    modalClose();
    // politician__link.classList.add("none");
  });
  // 文字読み込みをした時の処理
  captureButton.addEventListener("click", () => {
    // deleteSub();
    const canvas = document.createElement("canvas");
    const videoAspectRatio = video.videoWidth / video.videoHeight;
    canvas.width = video.clientWidth;
    canvas.height = video.clientWidth / videoAspectRatio;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imgDataUrl = canvas.toDataURL("image/png");
    const shotImage = document.createElement("img");
    shotImage.classList.add("shot__image");
    shotImage.setAttribute("src", imgDataUrl);
    shotBox.append(shotImage);
    //表示切替
    politician.classList.toggle("active");
    if (modalBack.classList.contains("active")) {
      modalBack.classList.remove("active");
      modalBack.classList.add("none");
    } else {
      modalBack.classList.remove("none");
      modalBack.classList.add("active");
    }

    if (true) {
      //モーダル出す処理を記述
    } else {
      //検索できなかった・エラーが出た際の処理を記述（）
    }

    //サーバー処理
    // fetch("index.php", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ imageDataUrl: imgDataUrl }),
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log(data);
    //     changeSub(data);
    //     alert("できた");
    //     politician__link.classList.remove("none");
    //   })
    //   .catch((error) => {
    //     politician__name.textContent = "もう一度試してください";
    //     console.log("Error:", error);
    //   });
  });
});
