 function showTab(tabId) {
            document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
            document.getElementById(tabId).classList.add('active');
        }

        function registerUser() {
            let username = document.getElementById("regUsername").value;
            let password = document.getElementById("regPassword").value;
            let messageElement = document.getElementById("registerMessage");

            if (!username || !password) {
                messageElement.innerText = "Please fill in all fields!";
                return;
            }

            if (localStorage.getItem(username)) {
                messageElement.innerText = "Username already exists!";
            } else {
                localStorage.setItem(username, password);
                messageElement.innerText = "User Registered Successfully!";
                setTimeout(() => showTab('login'), 1000);
            }
        }

        function loginUser() {
            let username = document.getElementById("loginUsername").value;
            let password = document.getElementById("loginPassword").value;
            let messageElement = document.getElementById("loginMessage");

            if (localStorage.getItem(username) === password) {
                messageElement.innerText = "Login Successful!";
                setTimeout(() => showTab('chat'), 1000);
            } else {
                messageElement.innerText = "Invalid Credentials!";
            }
        }

        // Chat functionality
        let unsentMessages = [];
        function sendMessage() {
            let messageInput = document.getElementById("messageInput").value;
            let chatBox = document.getElementById("chatBox");
            if (messageInput) {
                let messageDiv = document.createElement("div");
                messageDiv.classList.add("message");
                messageDiv.innerText = messageInput;
                chatBox.appendChild(messageDiv);
                unsentMessages.push(messageInput);
                displayUnsentMessages();
            }
            document.getElementById("messageInput").value = "";
        }

        function displayUnsentMessages() {
            let unsentDiv = document.getElementById("unsentMessages");
            unsentDiv.innerHTML = '';
            unsentMessages.forEach(msg => {
                let unsentMsgDiv = document.createElement("div");
                unsentMsgDiv.innerText = msg;
                unsentDiv.appendChild(unsentMsgDiv);
            });
        }

        // Drawing Board
        let canvas = document.getElementById("drawCanvas");
        let ctx = canvas.getContext("2d");
        canvas.width = 400;
        canvas.height = 250;
        let isDrawing = false;

        canvas.addEventListener("mousedown", () => isDrawing = true);
        canvas.addEventListener("mouseup", () => isDrawing = false);
        canvas.addEventListener("mousemove", (event) => {
            if (!isDrawing) return;
            ctx.strokeStyle = document.getElementById("penColor").value;
            ctx.lineWidth = document.getElementById("penSize").value;
            ctx.lineTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
            ctx.stroke();
        });

        function clearCanvas() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }

        // File Sharing
        function uploadFile() {
            let fileInput = document.getElementById("fileInput");
            let fileList = document.getElementById("fileList");
            if (fileInput.files.length > 0) {
                let file = fileInput.files[0];
                let fileDiv = document.createElement("div");
                fileDiv.innerText = `Uploaded: ${file.name}`;
                fileList.appendChild(fileDiv);
            }
        }

        // Voice Recording
        let mediaRecorder, audioChunks = [];
        function startRecording() {
            navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
                mediaRecorder = new MediaRecorder(stream);
                mediaRecorder.start();
                mediaRecorder.ondataavailable = e => audioChunks.push(e.data);
            });
        }

        function stopRecording() {
            mediaRecorder.stop();
            mediaRecorder.onstop = () => {
                document.getElementById("audioPlayback").src = URL.createObjectURL(new Blob(audioChunks, { type: "audio/wav" }));
            };
        }

        // Video Sharing
        function uploadVideo() {
            let videoInput = document.getElementById("videoInput");
            let videoList = document.getElementById("videoList");
            if (videoInput.files.length > 0) {
                let video = videoInput.files[0];
                let videoDiv = document.createElement("div");
                let videoElement = document.createElement("video");
                videoElement.controls = true;
                videoElement.src = URL.createObjectURL(video);
                videoDiv.appendChild(videoElement);
                videoList.appendChild(videoDiv);
            }
        }
    </script>
