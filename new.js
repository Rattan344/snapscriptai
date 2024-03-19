import jsPDF from 'jspdf';
const selectBtn = document.querySelector("#selectBtn");
const generateBtn = document.querySelector("#generate");
const previewArea = document.querySelector("#previewArea");
const ans=document.querySelector(".ans");
let selectedFile;
const pdf=document.querySelector("#pdf");
const go=document.querySelector(".go");
const input=document.querySelector("#myTextarea");
const ai=document.querySelector(".ai");
const para=document.querySelector(".para");

//click go button of chatbot
go.addEventListener("click",chatbot);

function chatbot(){
    const not=input.value;
    console.log(not);
    run2(not);
    
    

}


//click listen for button select
selectBtn.addEventListener("click", openFileDialog);

function openFileDialog() {
    var input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';

    input.click();

    input.addEventListener('change', function () {
        selectedFile = input.files[0];
        previewImage(selectedFile);
    });
}
//lets preview the image
function previewImage(imageFile) {
    const reader = new FileReader();

    reader.onload = function (e) {
        const img = new Image();
        img.width = 300;
        img.height = 400;
        img.src = e.target.result;
        img.classList.add("img-fluid");
        previewArea.innerHTML = '';
        previewArea.appendChild(img);
    }

    reader.readAsDataURL(imageFile);
}
//click the generte button 
generateBtn.addEventListener("click", () => {
    if (!selectedFile) {
        console.error('No file selected.');
        return;
    }
    ans.style.fontSize = '40px'
    ans.innerHTML="Please wait..... :)";
    extractTextFromImage(selectedFile);

});

//here tesseract extraction happen

async function extractTextFromImage(imageFile) {
    try {
        Tesseract.recognize(
            imageFile,
            'eng',
            { logger: m => console.log(m) }
        ).then(({ data: { text } }) => {
           // console.log('Extracted Text:', text);
            // Call the function to process the extracted text
            ans.innerHTML="Text is extracted...";
            processExtractedText(text);
            
        });

        function processExtractedText(extractedText) {
            // Placeholder function for processing the extracted text
            console.log('Processing Extracted Text:', extractedText);
             run(extractedText);
        }

    } catch (error) {
        console.error('Error extracting text:', error);
    }
}

// function generatePDF() {
//     // Create a new jsPDF instance
//     const doc = new jsPDF();
  
//     // Get the text from the div with class "myDiv"
//     const text = document.querySelector(".myDiv").textContent;
  
//     // Add the text to the PDF
//     doc.text(text, 10, 10); // (text, x, y)
  
//     // Save the PDF
//     doc.save('generated.pdf');
// }
  

// pdf.addEventListener("click",generatePDF());
//this help use to see the ans comong from gemini ai
function showit(output){
        // Replace asterisks (*) with an empty string to remove them
        let formattedText = output.replace(/\*/g, '');
    
        // Add a new line before "polic stop"
        formattedText = formattedText.replace(/polic stop/gi, '\nPOLICE STOP');
    
    
    ans.innerHTML=formattedText;
    const doc = new jsPDF();
  
    // Get the text from the div with class "myDiv"
    //const text = document.querySelector(".myDiv").textContent;
  
    // Add the text to the PDF
    doc.text(formattedText, 10, 10); // (text, x, y)
  
    // Save the PDF
    doc.save('generated.pdf');
    
}
//print the loaded text form tessearact

// function processExtractedText(extractedText) {
//     // Placeholder function for processing the extracted text
//     console.log('Processing Extracted Text:', extractedText);
// }
//
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI("AIzaSyBDnXCOrBHfRsUjZSENaa2SChBiZHeRl4A");

async function run(extractedText) {
    
    ans.innerHTML="Hello gemini here....";
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-pro"});

  const prompt = extractedText+" "+" **generte long notes per heading"


  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  ans.innerHTML="Your final text is ..";
  ans.style.fontSize = '10px'
  showit(text);
  console.log(text);
}
//chatbot code
// const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable (see "Set up your API key" above)
const genaAI = new GoogleGenerativeAI("AIzaSyCF0UYXjC4hFDYKIWZfKzRNbtZDXSlEUYc");

async function run2(not) {
  // For text-only input, use the gemini-pro model
  const model = genaAI.getGenerativeModel({ model: "gemini-pro"});

  const chat = model.startChat({
    history: [
      {
        role: "user",
        parts: [{ text: "hello" }],
      },
      {
        role: "model",
        parts: [{ text: "hello" }],
      },
    ],
    generationConfig: {

      maxOutputTokens: 1000,
    },
  });

  const msg = not;

  const result = await chat.sendMessage(msg);
  const response = await result.response;
  const text = response.text();
  console.log(text);
  //para.innerHTML=text;
  ai.innerHTML=text;

  
}

//run();

//run();


