const xhr = new XMLHttpRequest();
//we add event listener first bcz in click as well we will define the onclick first and then click the button
xhr.addEventListener('load',() => {
    console.log(xhr.response);
})

xhr.open('GET', 'https://supersimplebackend.dev');
xhr.send();
//xhr.response //this will be undefined first bcz it takes time to process our request and send response. so we have to wait first before accesing the response.
