/* =====================================================
   FARMSYNC JAVASCRIPT
===================================================== */


/* =====================================================
   GLOBAL DATA
===================================================== */

let demand = 78;

let produceData =
  JSON.parse(
    localStorage.getItem("farmsyncProduce")
  ) || [];


const sampleProduce = [

  {
    name: "Tomato",
    farmer: "Arun Kumar",
    location: "Pollachi",
    price: 28,
    quality: "Grade A",
    quantity: 40
  },

  {
    name: "Onion",
    farmer: "Priya",
    location: "Udumalpet",
    price: 31,
    quality: "Grade A",
    quantity: 35
  },

  {
    name: "Carrot",
    farmer: "Kumar",
    location: "Ooty",
    price: 42,
    quality: "Premium",
    quantity: 25
  },

  {
    name: "Coconut",
    farmer: "Suresh",
    location: "Kinathukadavu",
    price: 35,
    quality: "Grade A",
    quantity: 30
  },

  {
    name: "Potato",
    farmer: "Meena",
    location: "Mettupalayam",
    price: 29,
    quality: "Grade A",
    quantity: 50
  }

];


const farmers = [

  {
    name: "Arun Kumar",
    location: "Pollachi",
    score: 96,
    quantity: 40,
    quality: "Grade A"
  },

  {
    name: "Priya",
    location: "Udumalpet",
    score: 91,
    quantity: 35,
    quality: "Grade A"
  },

  {
    name: "Kumar",
    location: "Coimbatore",
    score: 87,
    quantity: 25,
    quality: "Premium"
  },

  {
    name: "Suresh",
    location: "Kinathukadavu",
    score: 82,
    quantity: 30,
    quality: "Grade A"
  }

];


/* =====================================================
   ENTRY SCREEN
===================================================== */

function enterFarmSync(){

  const entry =
    document.getElementById("entryScreen");

  entry.style.opacity = "0";

  setTimeout(function(){

    entry.style.display = "none";

    document.getElementById("app").style.display =
      "block";

    window.scrollTo({
      top:0,
      behavior:"smooth"
    });

  },900);

}


/* =====================================================
   PAGE NAVIGATION
===================================================== */

function showPage(pageName, button){

  const pages =
    document.querySelectorAll(".page");

  pages.forEach(function(page){

    page.classList.add("hidden");

  });


  const selected =
    document.getElementById(pageName);

  if(selected){

    selected.classList.remove("hidden");

  }


  const buttons =
    document.querySelectorAll(".navBtn");

  buttons.forEach(function(btn){

    btn.classList.remove("active");

  });


  if(button){

    button.classList.add("active");

  }

  window.scrollTo({
    top:0,
    behavior:"smooth"
  });

}


function showPageByName(pageName){

  const button =
    Array.from(
      document.querySelectorAll(".navBtn")
    ).find(function(btn){

      return btn.innerText
        .toLowerCase()
        .includes(pageName);

    });


  if(pageName === "farmer"){

    showPage("farmer", button);

  }

  else if(pageName === "consumer"){

    showPage("consumer", button);

  }

  else if(pageName === "orders"){

    showPage("orders", button);

  }

}


/* =====================================================
   TOAST
===================================================== */

let toastTimer;


function showToast(message){

  const toast =
    document.getElementById("toast");

  toast.innerText = message;

  toast.classList.add("show");

  clearTimeout(toastTimer);

  toastTimer =
    setTimeout(function(){

      toast.classList.remove("show");

    },2600);

}


/* =====================================================
   POWERPOOL
===================================================== */

function joinPowerPool(button){

  button.innerText = "✓ JOINED";

  button.style.background = "#4fa863";

  showToast(
    "⚡ Successfully joined the PowerPool!"
  );

}


/* =====================================================
   LIVE DEMAND
===================================================== */

function updateDemand(){

  const change =
    Math.floor(
      Math.random() * 7
    ) - 3;

  demand += change;

  if(demand < 60){

    demand = 60;

  }

  if(demand > 96){

    demand = 96;

  }


  const bar =
    document.getElementById("demandBar");

  const text =
    document.getElementById("demandText");

  const value =
    document.getElementById("demandValue");


  if(bar){

    bar.style.width =
      demand + "%";

  }

  if(text){

    text.innerText =
      demand + "%";

  }

  if(value){

    value.innerText =
      demand + "%";

  }

}


setInterval(
  updateDemand,
  3000
);


/* =====================================================
   ADD PRODUCE
===================================================== */

function addProduce(){

  const name =
    document
      .getElementById("produceName")
      .value
      .trim();

  const qty =
    Number(
      document
        .getElementById("produceQty")
        .value
    );

  const price =
    Number(
      document
        .getElementById("producePrice")
        .value
    );

  const location =
    document
      .getElementById("produceLocation")
      .value
      .trim();

  const quality =
    document
      .getElementById("produceQuality")
      .value;


  if(
    !name ||
    !qty ||
    !price ||
    !location
  ){

    showToast(
      "⚠️ Please fill all produce details."
    );

    return;

  }


  const newProduce = {

    id:Date.now(),

    name:name,

    quantity:qty,

    price:price,

    location:location,

    quality:quality,

    date:
      new Date().toLocaleDateString()

  };


  produceData.push(newProduce);


  localStorage.setItem(
    "farmsyncProduce",
    JSON.stringify(produceData)
  );


  document
    .getElementById("produceName")
    .value = "";

  document
    .getElementById("produceQty")
    .value = "";

  document
    .getElementById("producePrice")
    .value = "";

  document
    .getElementById("produceLocation")
    .value = "";


  renderProduce();

  showToast(
    "🌱 Produce added successfully!"
  );

}


/* =====================================================
   RENDER FARMER PRODUCE
===================================================== */

function renderProduce(){

  const list =
    document.getElementById(
      "produceList"
    );

  if(!list){

    return;

  }


  list.innerHTML = "";


  if(produceData.length === 0){

    list.innerHTML = `

      <div class="panel">

        <h3>No produce listed yet.</h3>

        <p style="margin-top:6px;color:#718078">
          Add your first produce above.
        </p>

      </div>

    `;

    return;

  }


  produceData.forEach(function(item){

    list.innerHTML += `

      <div class="produceItem">

        <div>

          <h3>
            🌾 ${escapeHTML(item.name)}
          </h3>

          <p>
            📦 ${item.quantity} kg
            &nbsp; • &nbsp;
            💰 ₹${item.price}/kg
            <br>

            📍 ${escapeHTML(item.location)}
            &nbsp; • &nbsp;
            ⭐ ${escapeHTML(item.quality)}
          </p>

        </div>

        <span class="activeBadge">
          ACTIVE
        </span>

      </div>

    `;

  });

}


/* =====================================================
   SEARCH
===================================================== */

function searchProduce(){

  const inputElement =
    document.getElementById(
      "searchInput"
    );

  const results =
    document.getElementById(
      "searchResults"
    );

  if(!inputElement || !results){

    return;

  }


  const query =
    inputElement.value
      .toLowerCase()
      .trim();


  const filtered =
    sampleProduce.filter(function(item){

      return (

        item.name
          .toLowerCase()
          .includes(query)

        ||

        item.location
          .toLowerCase()
          .includes(query)

        ||

        item.farmer
          .toLowerCase()
          .includes(query)

      );

    });


  results.innerHTML = "";


  if(filtered.length === 0){

    results.innerHTML = `

      <div class="searchItem">

        <div>
          No matching produce found.
        </div>

      </div>

    `;

    return;

  }


  filtered.forEach(function(item){

    results.innerHTML += `

      <div class="searchItem">

        <div>

          <strong>
            🌾 ${escapeHTML(item.name)}
          </strong>

          <small>
            👨‍🌾 ${escapeHTML(item.farmer)}
            <br>
            📍 ${escapeHTML(item.location)}
            <br>
            ⭐ ${escapeHTML(item.quality)}
            • 📦 ${item.quantity} kg available
          </small>

        </div>

        <div class="searchPrice">
          ₹${item.price}/kg
        </div>

      </div>

    `;

  });

}


/* =====================================================
   FARMER MATCHING
===================================================== */

function renderFarmerMatches(){

  const box =
    document.getElementById(
      "farmerMatches"
    );

  if(!box){

    return;

  }


  box.innerHTML = "";


  farmers.forEach(function(farmer){

    box.innerHTML += `

      <div class="matchItem">

        <div class="matchTop">

          <div>

            <strong>
              👨‍🌾 ${escapeHTML(farmer.name)}
            </strong>

            <div class="matchLocation">
              📍 ${escapeHTML(farmer.location)}
              • 📦 ${farmer.quantity} kg
            </div>

          </div>

          <div class="matchScore">
            ${farmer.score}%
          </div>

        </div>


        <div class="matchProgress">

          <div
            style="width:${farmer.score}%">
          </div>

        </div>


        <div class="matchTags">

          <span class="matchTag">
            ✓ Location
          </span>

          <span class="matchTag">
            ✓ Quality
          </span>

          <span class="matchTag">
            ✓ Price
          </span>

          <span class="matchTag">
            ✓ Quantity
          </span>

        </div>

      </div>

    `;

  });

}


/* =====================================================
   FAIR PRICE CALCULATOR
===================================================== */

function calculateFairPrice(){

  const market =
    Number(
      document.getElementById(
        "marketPrice"
      ).value
    );

  const farmer =
    Number(
      document.getElementById(
        "farmerPrice"
      ).value
    );

  const quantity =
    Number(
      document.getElementById(
        "orderQty"
      ).value
    );


  if(
    market <= 0 ||
    farmer <= 0 ||
    quantity <= 0
  ){

    showToast(
      "⚠️ Enter valid price and quantity."
    );

    return;

  }


  const total =
    farmer * quantity;

  const marketTotal =
    market * quantity;

  const saving =
    marketTotal - total;

  const savingPercent =
    (
      saving /
      marketTotal
    ) * 100;


  const result =
    document.getElementById(
      "priceResult"
    );


  result.innerHTML = `

    <div class="priceResultBox">

      <h3>
        ✓ Fair Price Result
      </h3>

      <p>
        Farmer direct value:
        <strong>
          ₹${total.toFixed(0)}
        </strong>
      </p>

      <p>
        Estimated consumer saving:
        <strong>
          ₹${Math.max(saving,0).toFixed(0)}
        </strong>
      </p>

      <p>
        Direct-market difference:
        <strong>
          ${Math.max(savingPercent,0).toFixed(1)}%
        </strong>
      </p>

    </div>

  `;


  showToast(
    "💰 Fair price calculated!"
  );

}


/* =====================================================
   SMART ORDER
===================================================== */

function createSmartOrder(){

  const orderNumber =
    "FS" +
    Math.floor(
      1000 +
      Math.random() * 9000
    );


  const order = {

    id:orderNumber,

    product:"Tomato",

    quantity:100,

    total:2800,

    status:"In Transit",

    created:
      new Date().toLocaleString()

  };


  localStorage.setItem(
    "farmsyncLastOrder",
    JSON.stringify(order)
  );


  const orderId =
    document.getElementById(
      "orderId"
    );

  if(orderId){

    orderId.innerText =
      orderNumber;

  }


  showToast(
    "🚀 Smart order created successfully!"
  );


  setTimeout(function(){

    showPageByName("orders");

  },1000);

}


/* =====================================================
   SMART ALERT
===================================================== */

function enableAlerts(){

  localStorage.setItem(
    "farmsyncAlerts",
    "enabled"
  );

  showToast(
    "🔔 Smart demand alerts enabled!"
  );

}


/* =====================================================
   PRICE CHART
===================================================== */

function createPriceChart(){

  const canvas =
    document.getElementById(
      "priceChart"
    );

  if(!canvas){

    return;

  }


  new Chart(
    canvas.getContext("2d"),
    {

      type:"line",

      data:{

        labels:[
          "Sep 10",
          "Sep 11",
          "Sep 12",
          "Sep 13",
          "Sep 14",
          "Sep 15",
          "Sep 16"
        ],

        datasets:[

          {

            label:"Tomato Price ₹/kg",

            data:[
              22,
              24,
              23,
              25,
              27,
              26,
              28
            ],

            tension:.4,

            fill:true,

            borderWidth:3,

            pointRadius:4,

            pointHoverRadius:7

          }

        ]

      },

      options:{

        responsive:true,

        maintainAspectRatio:false,

        interaction:{

          intersect:false,

          mode:"index"

        },

        plugins:{

          legend:{

            display:true

          }

        },

        scales:{

          y:{

            beginAtZero:false,

            ticks:{

              callback:function(value){

                return "₹" + value;

              }

            }

          }

        }

      }

    }

  );

}


/* =====================================================
   QR CODE
===================================================== */

function createQRCode(){

  const qr =
    document.getElementById(
      "qrcode"
    );

  if(!qr){

    return;

  }


  qr.innerHTML = "";


  if(typeof QRCode === "undefined"){

    qr.innerHTML = `
      <p style="color:#718078;font-size:12px">
        QR library loading...
      </p>
    `;

    return;

  }


  new QRCode(
    qr,
    {

      text:
        "FARMSYNC | Tomato | Arun Kumar | Pollachi | Grade A | Harvest 15 Sep 2026",

      width:150,

      height:150

    }
  );

}


/* =====================================================
   LOAD SAVED ORDER
===================================================== */

function loadOrder(){

  const saved =
    localStorage.getItem(
      "farmsyncLastOrder"
    );

  if(!saved){

    return;

  }


  try{

    const order =
      JSON.parse(saved);

    const orderId =
      document.getElementById(
        "orderId"
      );

    if(orderId){

      orderId.innerText =
        order.id;

    }

  }

  catch(error){

    console.log(
      "Order data error"
    );

  }

}


/* =====================================================
   SECURITY HELPER
===================================================== */

function escapeHTML(value){

  return String(value)

    .replaceAll("&","&amp;")

    .replaceAll("<","&lt;")

    .replaceAll(">","&gt;")

    .replaceAll('"',"&quot;")

    .replaceAll("'","&#039;");

}


/* =====================================================
   INITIALIZATION
===================================================== */

window.addEventListener(
  "load",
  function(){

    renderProduce();

    renderFarmerMatches();

    searchProduce();

    createPriceChart();

    createQRCode();

    loadOrder();

  }
);
