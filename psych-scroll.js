function LightenDarkenColor(col, amt) {
  
    var usePound = false;
  
    if (col[0] == "#") {
        col = col.slice(1);
        usePound = true;
    }
 
    var num = parseInt(col,16);
 
    var r = (num >> 16) + amt;
 
    if (r > 255) r = 255;
    else if  (r < 0) r = 0;
 
    var b = ((num >> 8) & 0x00FF) + amt;
 
    if (b > 255) b = 255;
    else if  (b < 0) b = 0;
 
    var g = (num & 0x0000FF) + amt;
 
    if (g > 255) g = 255;
    else if (g < 0) g = 0;
 
    return (usePound?"#":"") + (g | (b << 8) | (r << 16)).toString(16); 
}

function titleCopyArray(title, numberOfcopies) {
  let titles = [];

  for (var i = 1; i <= numberOfcopies; i++) {
      let titleCopy = title.cloneNode(true);
      let color = LightenDarkenColor('#E02020', i * 20);

      titleCopy.style.color = color;

      title.before(titleCopy);

      titles.push(titleCopy);
    }

  return titles;
}

window.psychScroll = () => {
  const sections = document.getElementById('sections').children;
  const footer = document.querySelector('.footer');
  const windowHeight = window.innerHeight;
  const numberOfcopies = 4;
  const distance = 100;
  const spaceBetween = distance/numberOfcopies;
  const fontSize = 100;

  footer.style.height = `${windowHeight}px`;

  Array.prototype.forEach.call(sections, section => {
    section.style.minHeight = `${windowHeight}px`;

    let sectionHeight = section.offsetHeight;
    let sectionBoundaries = section.getBoundingClientRect();
    let sectionTop = sectionBoundaries.top;
    let sectionBottom = sectionBoundaries.bottom;
    let title = section.querySelector('.psych');
    let titles = titleCopyArray(title, numberOfcopies);

    title.style.position = 'relative';

    titles.forEach((title, index) => {
      let startingPosition = distance - (index * spaceBetween);

      title.style.transform = `translateY(${startingPosition}%) translateX(${startingPosition / 2}%)`
      title.style.fontSize = `${fontSize - ((numberOfcopies * 4) - (index * 4))}px`
    });
    
    document.addEventListener('scroll', (e) => {
      let scrollPosition = window.scrollY;

      if (scrollPosition >= sectionTop && scrollPosition <= sectionBottom) {
        let distanceFromTop = section.getBoundingClientRect().bottom;
        let percentComplete = 1 - (distanceFromTop/sectionHeight);

        console.log(percentComplete);

        titles.forEach((title, index) => {
          let startingPosition = distance - (index * spaceBetween);
          let newPosition = startingPosition - (startingPosition * percentComplete);

          title.style.transform = `translateY(${newPosition}%) translateX(${newPosition/2}%)`
        });
        
      } else {
        
      }
    });
  });
}