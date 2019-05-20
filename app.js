document.addEventListener('DOMContentLoaded',() => {

  const errorHandler = document.getElementById('errorHandler');
  const form = document.getElementById('registrar');
  const input = form.querySelector('input');
  const mainDiv = document.querySelector('.main');
  const ul = document.getElementById('invitedList');
  const div = document.createElement('div');
  const filterLabel = document.createElement('label');
  const filterCheckBox = document.createElement('input');
  /// Lines 15-23 added by Zane Chandy.
  let checkArray = [];
  let notComingExists = false;
  const notComing = document.createElement('h2');
  notComing.id = 'interchangableHeader';
  let interchangableHeader = document.querySelector('#interchangableHeader');
  const notComingText = document.createTextNode("Not coming");
  const ulUninvitedList = document.createElement('ul');
  ulUninvitedList.id = ('uninvitedList');
  let actualUlUninvitedList = document.querySelector('#uninvitedList');

  filterCheckBox.addEventListener('change', (e) => {
    /// Lines 26-32 added by Zane Chandy.
    // Create uninvisted list and header 
    if (notComingExists === false) {
      notComing.appendChild(notComingText);
      mainDiv.appendChild(notComing);
      mainDiv.appendChild(ulUninvitedList);
      notComingExists = true;
    }

    const isChecked = e.target.checked;
    const lis = ul.children;
    /// Lines 37-107 added/edited by Zane Chandy.
    const lisUninvitedList = ulUninvitedList.children;
    if (isChecked) {
      let i = 0;
      while (i < lis.length) {
        let li = lis[i];
        if (li.className === 'responded') {
          li.children[1].style.display = "none";
          li.style.display = '';
          i++;
        }
        else if (li.className === 'notResponded') {
          ul.removeChild(li);
          ulUninvitedList.appendChild(li);
        }     
      }
      for (let i = 0; i < lisUninvitedList.length; i++) {
         let li = lisUninvitedList[i];
         li.children[1].style.display = "none";
         li.children[2].style.display = "none";
         li.children[3].style.display = "none";
         li.children[4].style.display = "none";
         let label = document.createElement('label');
         label.textContent = "Reason for not showing up: ";
         label.style.marginBottom = '10px';
         li.appendChild(label);
         let select = document.createElement('select');
         let size = document.createAttribute('size');
         size.value = "3";
         select.setAttributeNode(size);
         let optionOne = document.createElement('option');
         optionOne.textContent = "Is busy that day";
         let optionTwo = document.createElement('option');
         optionTwo.textContent = "Something came up";
         let optionThree = document.createElement('option');
         optionThree.textContent = "No particular reason";
         select.appendChild(optionOne);
         select.appendChild(optionTwo);
         select.appendChild(optionThree);
         li.appendChild(select); 
      }   
    } else {
      let i = 0; 
      while (i < lisUninvitedList.length) {
        let li = lisUninvitedList[i];
        let label = li.getElementsByTagName("LABEL")[1];
        label.parentElement.removeChild(label);
        let select = li.getElementsByTagName("SELECT")[0];
        select.parentElement.removeChild(select);
        li.parentElement.removeChild(li);
        ul.appendChild(li);
      }
      for (let i = 0; i < lis.length; i++) { 
        let li = lis[i];
        li.children[1].style.display = "block";
        if (li.className === 'notResponded') {
          li.children[4].style.display = "inline-block";
          li.children[3].style.display = "inline-block";
          li.children[2].style.display = "block";
          li.children[1].style.display = "block";
        }
        li.style.display = '';
      }
      if (notComingExists === true) {
        interchangableHeader = document.querySelector('#interchangableHeader');
        actualUlUninvitedList = document.querySelector('#uninvitedList');
        actualUlUninvitedList.parentElement.removeChild(actualUlUninvitedList);
        interchangableHeader.parentElement.removeChild(interchangableHeader);
        notComingExists = false;
      }
    }
  });
  
  filterLabel.textContent = "Hide those who haven't responded";
  filterCheckBox.type = 'checkbox';
  div.appendChild(filterLabel); 
  div.appendChild(filterCheckBox);
  mainDiv.insertBefore(div, ul);
  
  function createLI(text) {
    function createElement(elementName, property, value) {
        const element = document.createElement(elementName);
        element[property] = value;
        return element;
    }
    
    function appendToLI(elementName, property, value) {
        const element = createElement(elementName, property, value);
        li.appendChild(element);
        return element;
    }
    
    const li = document.createElement('li');
    /// Line 131 added by Zane Chandy.
    li.className = 'notResponded'; 
    appendToLI('span', 'textContent', text);
    appendToLI('label', 'textContent', 'Confirmed').appendChild(appendToLI('input', 'type', 'checkbox'));
    let textarea = appendToLI('textarea','textContent','');
    textarea.style.display = 'block';
    textarea.style.marginTop = '10px';
    appendToLI('button', 'textContent', 'edit');
    appendToLI('button', 'textContent', 'remove');
    return li;
  }
  
  form.addEventListener('submit', (e) => {
    /// Lines 145-171 added/edited by Zane Chandy.
    if (input.value === "") {
      errorHandler.textContent = "* Form submission can not be blank.";
      errorHandler.style.marginRight = "275px";
      e.preventDefault();
    }
    else if (input.value !== "") {
      errorHandler.textContent = " ";
      e.preventDefault();
      const text = input.value;
      let nameExists = false;
      for (let i = 0; i < checkArray.length; i++) {
        if (text === checkArray[i]) {
          nameExists = true;
          e.preventDefault;
        }
      }
      if (nameExists) {
        errorHandler.textContent = "* Name already has been added to the list. Please type a different name.";
        errorHandler.style.marginRight = "50px";
      } else {
        checkArray.push(text);
        input.value = "";
        const li = createLI(text);
        ul.appendChild(li); 
      }
    }
  });
  
  ul.addEventListener('change', (e) => {
    const checkbox = event.target;
    const checked = checkbox.checked;
    const listItem = checkbox.parentNode.parentNode;
    /// Lines 180-190 added/edited by Zane Chandy.
    if (checked) {
      listItem.className = 'responded';
      listItem.children[4].style.display = "none";
      listItem.children[3].style.display = "none";
      listItem.children[2].style.display = "none";
    } else {
      listItem.className = 'notResponded';
      listItem.children[4].style.display = "inline-block";
      listItem.children[3].style.display = "inline-block";
      listItem.children[2].style.display = "block";
    }
  });
  
  ul.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
      const button = e.target;
      const li = button.parentNode;
      const ul = li.parentNode;
      const name = li.textContent;
      const action = button.textContent;
      const nameActions = {
        remove: () => { 
          /// Lines 204-210 added by Zane Chandy.
          for (let i = 0; i < checkArray.length; i++) {
            if (String(name) === checkArray[i] + "Confirmededitremove") {
              checkArray.pop();
            }
          }
          ul.removeChild(li);
        },
        edit: () => {
          const span = li.firstElementChild;
          const input = document.createElement('input');
          input.type = 'text';
          input.value = span.textContent;
          li.insertBefore(input, span);
          li.removeChild(span);
          button.textContent = 'save';   
        }, 
        save: () => {
          const input = li.firstElementChild;
          const span = document.createElement('span');
          span.textContent = input.value;
          li.insertBefore(span, input);
          li.removeChild(input);
          button.textContent = 'edit';          
        }
      }

      // select and run action in button's name
      nameActions[action]();
    }
  });
});