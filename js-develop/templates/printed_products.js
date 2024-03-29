export{hook_printed_products}

function hook_printed_products(){
    let div = document.createElement('div');
    div.setAttribute('id', 'printProductSelect');
    div.classList.add('print-products-container')
    let selectList = document.createElement('select');
    selectList.setAttribute('id', 'printedProductsList');
    let label = document.createElement('label');
    label.setAttribute('for', 'printedProductsList');
    label.textContent = 'Print';
    div.appendChild(label);
    selectList.appendChild(option_template('','Select one', ''));
    selectList.appendChild(option_template(
        uploadedLogoData.monochropPrint.id,
        uploadedLogoData.monochropPrint.title,
        uploadedLogoData.monochropPrint.priceHTML
    ));
    selectList.appendChild(option_template(
        uploadedLogoData.bichromPrint.id,
        uploadedLogoData.bichromPrint.title,
        uploadedLogoData.bichromPrint.priceHTML
    ));
    div.appendChild(selectList);
    return div;
}

function option_template(optionValue, optionText, optionPrice){
    let option = document.createElement('option');
    option.value = optionValue;
    option.setAttribute('data-price', optionPrice);
    option.setAttribute('id', optionValue);
    option.textContent = optionText;
    return option;
}