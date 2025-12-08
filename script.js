// MultiStep Navigation
var current_fs, next_fs, previous_fs;
var animating;

$(".next").click(function(){
    if(animating) return false;
    animating = true;

    current_fs = $(this).parent();
    next_fs = $(this).parent().next();

    $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");

    next_fs.show();
    current_fs.hide();
    animating = false;
});

$(".previous").click(function(){
    current_fs = $(this).parent();
    previous_fs = $(this).parent().prev();

    $("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");

    previous_fs.show();
    current_fs.hide();
});

// Predefined Background Preview
function previewBG() {
  const bg = document.getElementById('bgSelect').value;
  if(bg){
      document.getElementById('bgPreview').style.backgroundImage = `url('${bg}')`;
      window.customBG = null;
  }
}

// Upload Custom Background
function uploadBG() {
  const file = document.getElementById('bgUpload').files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {

      // remove dropdown selection
      document.getElementById('bgSelect').value = "";

      document.getElementById('bgPreview').style.backgroundImage = `url('${e.target.result}')`;

      // store uploaded BG
      window.customBG = e.target.result;
    };
    reader.readAsDataURL(file);
  }
}

// Generate ID
function generate() {

  let bg = document.getElementById('bgSelect').value;

  if (window.customBG) {
      bg = window.customBG;
  }

  document.getElementById('card-preview').style.backgroundImage = `url('${bg}')`;

  document.getElementById('t-name').textContent = document.getElementById('name').value;
  document.getElementById('t-fname').textContent = "Father: " + document.getElementById('fname').value;
  document.getElementById('t-dob').textContent = "DOB: " + document.getElementById('dob').value;
  document.getElementById('t-address').textContent = "Address: " + document.getElementById('address').value;
  document.getElementById('t-roll').textContent = "Roll: " + document.getElementById('roll').value;
  document.getElementById('t-mobile').textContent = "Mobile: " + document.getElementById('mobile').value;

  const imgInput = document.getElementById('imgUpload').files[0];
  if (imgInput) {
    const reader = new FileReader();
    reader.onload = function(e) {
      document.getElementById('photo').innerHTML = `<img src="${e.target.result}">`;
    };
    reader.readAsDataURL(imgInput);
  }

  alert("Your ID Card is Ready!");
}
function printID() {
    var printContents = document.getElementById("card-preview").outerHTML;
    var newWindow = window.open("", "_blank");

    newWindow.document.write(`
        <html>
        <head>
            <title>Print ID Card</title>
            <style>
                body { text-align:center; font-family: Arial; }
                #card-preview {
                    width: 350px;
                    height: 550px;
                    margin: 20px auto;
                    background-size: cover;
                    background-position: center;
                    border: 2px solid #000;
                    border-radius: 10px;
                    position: relative;
                }
                #card-preview img { width:100%; height:100%; object-fit:cover; }
                .text-field {
                    position:absolute;
                    left:40px;
                    font-size:16px;
                    font-weight:bold;
                }
                #t-name {
                    color:red;
                    font-size:22px;
                    font-weight:900;
                    width:100%;
                    left:0;
                    text-align:center;
                    -webkit-text-stroke:1.5px white;
                }
                .blue-glow { text-shadow:0 0 6px #66b3ff, 0 0 10px #3399ff; }
                .green-white-shadow { color: green; text-shadow:0 0 5px white; }
                #photo {
                    width:150px;
                    height:150px;
                    border-radius:50%;
                    background:#ddd;
                    position:absolute;
                    top:170px;
                    left:100px;
                    overflow:hidden;
                }
            </style>
        </head>
        <body>
            ${printContents}
            <script>
                window.onload = function() { window.print(); }
            <\/script>
        </body>
        </html>
    `);

    newWindow.document.close();
}
