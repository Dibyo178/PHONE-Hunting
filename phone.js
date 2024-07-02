const loadphone = async (searchText,isShowAll) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
  const data = await res.json();
  const phones = data.data;
  displayphones(phones,isShowAll);
}



const displayphones = (phones,isShowAll) => {
  const phoneContainer = document.getElementById('phone_container');
  // clear input text after new keyword search
  phoneContainer.textContent = '';


  const showAll = document.getElementById('showall');
//  console.log(showAll)

  if (phones.length > 12 && !isShowAll) {
      showAll.classList.remove('hidden');

  }
   else {
      showAll.classList.add('hidden');
  }

  // set 12 data set in display

  if(!isShowAll){

    phones = phones.slice(0, 12);

     
  }
 

  phones.forEach(phone => {
      const phonecard = document.createElement('div');
      phonecard.classList = `card bg-gray-100 p-4 shadow-xl`;
      phonecard.innerHTML = `
          <figure>
              <img src="${phone.image}" alt="Shoes" />
          </figure>
          <div class="card-body">
              <h2 class="card-title">${phone.phone_name}</h2>
              <p>${phone.brand}</p>
              <div class="card-actions justify-center">
                  <button onclick="handleshowDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
              </div>
          </div>
      `;
      phoneContainer.appendChild(phonecard);
  });

  // hide loading spinner


  toggleloding(false);
}

const handleclick = (isShowAll) => {

  toggleloding(true);
  const searchInput = document.getElementById('searchInput');
  const finddata = searchInput.value;
  loadphone(finddata,isShowAll);
}


// toggleloding spinner


const  toggleloding=(isLoading)=>{

   
   const loadingspinner= document.getElementById('loading-spinner');

   if(isLoading){

    loadingspinner.classList.remove('hidden');
     
   }

   else{

     loadingspinner.classList.add('hidden')
   }

  
}

// handleshowDetails

const handleshowDetails= async (id)=>{

    console.log(id);

    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);

    const  data = await res.json();

    // console.log(data)

    const phonedata = data.data;

    showthemodal(phonedata);


}

// showAll function

const showAllData = ()=>{

  handleclick(true);

     
}

// show the details modal

const showthemodal = (phone)=>{

  console.log(phone)

    // show the modal 

    const phonename = document.getElementById('show-detail-phone-name');

    phonename.innerHTML = phone.name;

    const shiwdetailcintainer = document.getElementById('show_details_container');

    shiwdetailcintainer.innerHTML=`

    <img src="${phone.image}" alt="">

    <p><span>Storage:${phone?.mainFeatures?.storage}</span></p>
    <p><span>Gps:${phone?.others?.GPS ? phone.others.GPS : 'No GPS Available'}</span></p>
    
    `;


    show_details_modal.showModal();
}


// loadphone();