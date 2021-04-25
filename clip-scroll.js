window.clipScroll = () => {
  const sections = document.getElementById('sections').children;
  const clipLeft = -100;
  const clipRight = 100;
  const footer = document.querySelector('.footer');
  const windowHeight = window.innerHeight;
  const body = document.getElementById('body');

  footer.style.height = `${windowHeight}px`;

  Array.prototype.forEach.call(sections, section => {
    section.style.minHeight = `${windowHeight}px`;

    let backgroundColor = section.dataset.backgroundColor;
    let wrapper = section.querySelector('.canvas-wrapper');
    let canvas = section.querySelector('.canvas');
    let sectionHeight = section.offsetHeight;
    let sectionBoundaries = section.getBoundingClientRect();
    let sectionTop = sectionBoundaries.top;
    let sectionBottom = sectionBoundaries.bottom;


    canvas.style.clipPath = `inset(0px ${ clipRight }% 0px ${ clipLeft }%)`;
    
    if (section == sections[0]) {
      wrapper.style.display = 'block'
      body.style.backgroundColor = backgroundColor;
    }
    
    document.addEventListener('scroll', (e) => {
      let scrollPosition = window.scrollY;

      if (scrollPosition >= sectionTop && scrollPosition <= sectionBottom) {
        let distanceFromTop = section.getBoundingClientRect().bottom;
        let percentComplete = (distanceFromTop/sectionHeight) * 100;
        let doublePercent = percentComplete * 2.5;
        let newClipLeft = clipLeft + doublePercent;
        let newClipRight = clipRight - doublePercent;

        body.style.backgroundColor = backgroundColor;
        
        wrapper.style.display = 'block'
        
        canvas.style.clipPath = `inset(0px ${ newClipRight }% 0px ${ newClipLeft }%)`;
      } else {
        wrapper.style.display = 'none'
      }
    });
  });
}