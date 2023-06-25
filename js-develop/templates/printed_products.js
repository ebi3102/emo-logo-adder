export{hook_printed_products}

function hook_printed_products(){
    let div = document.createElement('div');
    div.classList.add('print-products-container')
    let selectList = document.createElement('select');
    selectList.setAttribute('id', 'printedProductsList');
    let label = document.createElement('label');
    label.setAttribute('for', 'printedProductsList');
    label.textContent = 'Print';
    div.appendChild(label);
    selectList.appendChild(option_template(null,'Select one'));
    selectList.appendChild(option_template(12,'monochrome print'));
    selectList.appendChild(option_template(11,'bichrome print'));
    div.appendChild(selectList);
    return div;
}

function option_template(optionValue, optionText){
    let option = document.createElement('option');
    option.value = optionValue;
    option.textContent = optionText;
    return option;
}