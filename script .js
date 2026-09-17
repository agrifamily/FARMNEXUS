/* =====================================================
   FARMSYNC
   Farm to Family
   Complete Frontend Demo
===================================================== */


/* ================= GLOBAL DATA ================= */

let demand = 780;

let produceData = JSON.parse(
    localStorage.getItem("farmsyncProduce") || "null"
);


/* ================= SAMPLE DATA ================= */

const sampleProduce = [

    {
        id: 1,
        produce: "Tomato",
        emoji: "🍅",
        farmer: "Arun Kumar",
        location: "Pollachi",
        quantity: 60,
        price: 27,
        quality: "Premium"
    },

    {
        id: 2,
        produce: "Tomato",
        emoji: "🍅",
        farmer: "Priya",
        location: "Udumalpet",
        quantity: 40,
        price: 28,
        quality: "Premium"
    },

    {
        id: 3,
        produce: "Carrot",
        emoji: "🥕",
        farmer: "Kumar",
        location: "Ooty",
        quantity: 85,
        price: 42,
        quality: "Premium"
    },

    {
        id: 4,
        produce: "Onion",
        emoji: "🧅",
        farmer: "Suresh",
        location: "Kinathukadavu",
        quantity: 100,
        price: 32,
        quality: "Good"
    },

    {
        id: 5,
        produce: "Cabbage",
        emoji: "🥬",
        farmer: "Meena",
        location: "Mettupalayam",
        quantity: 75,
        price: 25,
        quality: "Good"
    }

];


if (!Array.isArray(produceData)) {
    produceData = sampleProduce;
}


/* ================= FARMER MATCH DATA ================= */

const farmers = [

    {
        name: "Arun Kumar",
        location: "Pollachi",
        produce: "Tomato",
        quantity: 60,
        price: 27,
        quality: "Premium",
        score: 96
    },

    {
        name: "Priya",
        location: "Udumalpet",
        produce: "Tomato",
        quantity: 40,
        price: 28,
        quality: "Premium",
        score: 91
    },

    {
        name: "Kumar",
        location: "Ooty",
        produce: "Carrot",
        quantity: 85,
        price: 42,
        quality: "Premium",
        score: 87
    },

    {
        name: "Suresh",
        location: "Kinathukadavu",
        produce: "Onion",
        quantity: 100,
        price: 32,
        quality: "Good",
        score: 82

    }

];


/* ================= PAGE NAVIGATION ================= */

function showPage(pageName) {

    const pages = document.querySelectorAll(".page");

    pages.forEach(function(page) {
        page.classList.remove("active-page");
    });


    const selectedPage =
        document.getElementById(pageName);

    if (selectedPage) {
        selectedPage.classList.add("active-page");
    }


    const buttons =
        document.querySelectorAll(".nav-btn");

    buttons.forEach(function(button) {

        button.classList.remove("active");

        if (
            button.getAttribute("data-page")
            === pageName
        ) {
            button.classList.add("active");
        }

    });


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


function showPageByName(pageName) {
    showPage(pageName);
}


/* ================= ENTER FARMSYNC ================= */

function enterFarmSync() {

    const entryScreen =
        document.getElementById("entryScreen");

    const app =
        document.getElementById("app");


    if (!entryScreen || !app) {
        console.log("Entry/App element missing");
        return;
    }


    entryScreen.style.opacity = "0";


    setTimeout(function() {

        entryScreen.style.display = "none";

        app.style.display = "block";

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }, 700);

}


/* ================= TOAST ================= */

function showToast(message) {

    const toast =
        document.getElementById("toast");

    const toastMessage =
        document.getElementById("toastMessage");


    if (!toast || !toastMessage) {
        return;
    }


    toastMessage.textContent = message;

    toast.classList.add("show");


    setTimeout(function() {

        toast.classList.remove("show");

    }, 3000);

}


/* ================= POWERPOOL ================= */

function joinPowerPool() {

    showToast(
        "You joined the Tomato PowerPool successfully!"
    );

}


/* ================= LIVE DEMAND ================= */

function updateDemand() {

    const change =
        Math.floor(Math.random() * 15) - 5;

    demand += change;


    if (demand < 700) {
        demand = 700;
    }

    if (demand > 950) {
        demand = 950;
    }


    const demandValue =
        document.getElementById("demandValue");

    const demandMeter =
        document.getElementById("demandMeter");

    const demandPercent =
        document.getElementById("demandPercent");


    if (demandValue) {
        demandValue.textContent = demand;
    }


    const percent =
        Math.round((demand / 1000) * 100);


    if (demandMeter) {
        demandMeter.style.width =
            percent + "%";
    }


    if (demandPercent) {
        demandPercent.textContent =
            percent + "%";
    }

}


/* ================= ADD PRODUCE ================= */

function addProduce(event) {

    event.preventDefault();


    const name =
        document.getElementById("produceName").value;

    const quantity =
        Number(
            document.getElementById("produceQuantity").value
        );

    const price =
        Number(
            document.getElementById("producePrice").value
        );

    const farmer =
        document.getElementById("farmerName").value;

    const location =
        document.getElementById("produceLocation").value;

    const quality =
        document.getElementById("produceQuality").value;


    if (
        !name ||
        !quantity ||
        !price ||
        !farmer ||
        !location
    ) {

        showToast(
            "Please fill all required fields."
        );

        return;
    }


    const emojiMap = {

        Tomato: "🍅",
        Carrot: "🥕",
        Onion: "🧅",
        Potato: "🥔",
        Cabbage: "🥬",
        Brinjal: "🍆"

    };


    const newProduce = {

        id: Date.now(),

        produce: name,

        emoji:
            emojiMap[name] || "🌱",

        farmer: farmer,

        location: location,

        quantity: quantity,

        price: price,

        quality: quality

    };


    produceData.unshift(newProduce);


    localStorage.setItem(
        "farmsyncProduce",
        JSON.stringify(produceData)
    );


    renderProduce();

    searchProduce();


    document
        .getElementById("produceForm")
        .reset();


    showToast(
        `${name} successfully listed!`
    );

}


/* ================= RENDER FARMER PRODUCE ================= */

function renderProduce() {

    const container =
        document.getElementById("produceList");


    if (!container) {
        return;
    }


    if (produceData.length === 0) {

        container.innerHTML = `
            <div class="panel">
                No produce listed yet.
            </div>
        `;

        return;
    }


    container.innerHTML =
        produceData.map(function(item) {

            return `

                <div class="produce-card">

                    <div class="produce-image">
                        ${escapeHTML(item.emoji)}
                    </div>

                    <h3>
                        ${escapeHTML(item.produce)}
                    </h3>

                    <p>
                        👨‍🌾 ${escapeHTML(item.farmer)}
                    </p>

                    <p>
                        📍 ${escapeHTML(item.location)}
                    </p>

                    <p>
                        📦 ${item.quantity} kg available
                    </p>

                    <div class="produce-price">
                        ₹${item.price}/kg
                    </div>

                    <span class="quality">
                        ⭐ ${escapeHTML(item.quality)}
                    </span>

                </div>

            `;

        }).join("");

}


/* ================= CONSUMER SEARCH ================= */

function searchProduce() {

    const container =
        document.getElementById("consumerProduce");


    if (!container) {
        return;
    }


    const input =
        document.getElementById("searchInput");


    const query =
        input
            ? input.value.toLowerCase().trim()
            : "";


    const filtered =
        produceData.filter(function(item) {

            if (!query) {
                return true;
            }


            return (

                item.produce
                    .toLowerCase()
                    .includes(query)

                ||

                item.farmer
                    .toLowerCase()
                    .includes(query)

                ||

                item.location
                    .toLowerCase()
                    .includes(query)

            );

        });


    if (filtered.length === 0) {

        container.innerHTML = `

            <div class="panel">

                <h3>No matching produce found.</h3>

                <p>
                    Try another produce or location.
                </p>

            </div>

        `;

        return;
    }


    container.innerHTML =
        filtered.map(function(item) {

            return `

                <div class="produce-card">

                    <div class="produce-image">
                        ${escapeHTML(item.emoji)}
                    </div>

                    <h3>
                        ${escapeHTML(item.produce)}
                    </h3>

                    <p>
                        👨‍🌾 ${escapeHTML(item.farmer)}
                    </p>

                    <p>
                        📍 ${escapeHTML(item.location)}
                    </p>

                    <p>
                        📦 ${item.quantity} kg available
                    </p>

                    <div class="produce-price">
                        ₹${item.price}/kg
                    </div>

                    <span class="quality">
                        ⭐ ${escapeHTML(item.quality)}
                    </span>

                    <br><br>

                    <button
                        class="primary-btn"
                        onclick="selectProduce('${escapeHTML(item.produce)}')">

                        🛒 Buy Produce

                    </button>

                </div>

            `;

        }).join("");

}


/* ================= SELECT PRODUCE ================= */

function selectProduce(produce) {

    showToast(
        `${produce} selected. Smart matching started!`
    );


    setTimeout(function() {

        showPage("consumer");

    }, 300);

}


/* ================= FARMER MATCHING ================= */

function renderFarmerMatches() {

    const container =
        document.getElementById("farmerMatches");


    if (!container) {
        return;
    }


    container.innerHTML =
        farmers.map(function(farmer) {

            return `

                <div class="match-card">

                    <div class="match-score">
                        ${farmer.score}%
                    </div>

                    <div class="farmer-avatar">
                        👨‍🌾
                    </div>

                    <h3>
                        ${escapeHTML(farmer.name)}
                    </h3>

                    <p>
                        📍 ${escapeHTML(farmer.location)}
                    </p>

                    <p>
                        🌱 ${escapeHTML(farmer.produce)}
                    </p>

                    <p>
                        📦 ${farmer.quantity} kg
                    </p>

                    <p>
                        💰 ₹${farmer.price}/kg
                    </p>

                    <div class="match-reasons">

                        <span>📍 Location</span>

                        <span>💰 Price</span>

                        <span>⭐ Quality</span>

                    </div>

                    <button
                        onclick="chooseFarmer('${escapeHTML(farmer.name)}')">

                        Select Farmer

                    </button>

                </div>

            `;

        }).join("");

}


/* ================= CHOOSE FARMER ================= */

function chooseFarmer(name) {

    showToast(
        `${name} matched successfully!`
    );

}


/* ================= FAIR PRICE ================= */

function calculateFairPrice() {

    const produce =
        document.getElementById("calcProduce").value;

    const quantity =
        Number(
            document.getElementById("calcQuantity").value
        );


    if (!quantity || quantity <= 0) {

        showToast(
            "Enter a valid quantity."
        );

        return;
    }


    const marketPrices = {

        Tomato: 27,
        Carrot: 42,
        Onion: 32,
        Potato: 30

    };


    const basePrice =
        marketPrices[produce] || 30;


    const farmerShare =
        basePrice * 0.86;


    const logistics =
        basePrice * 0.07;


    const platform =
        basePrice * 0.03;


    const consumerPrice =
        farmerShare +
        logistics +
        platform;


    const total =
        consumerPrice * quantity;


    const result =
        document.getElementById("fairPriceResult");


    result.innerHTML = `

        <strong>Fair Price Estimate</strong>

        <br><br>

        🌱 Farmer receives:
        ₹${farmerShare.toFixed(2)}/kg

        <br>

        🚚 Logistics:
        ₹${logistics.toFixed(2)}/kg

        <br>

        ⚙️ Platform:
        ₹${platform.toFixed(2)}/kg

        <br><br>

        💰 Consumer Fair Price:
        <strong>
            ₹${consumerPrice.toFixed(2)}/kg
        </strong>

        <br>

        📦 Total for ${quantity} kg:
        <strong>
            ₹${total.toFixed(2)}
        </strong>

    `;

}


/* ================= AUTO ORDER ================= */

function createSmartOrder() {

    const order = {

        id:
            "FS" +
            Math.floor(
                100000 +
                Math.random() * 900000
            ),

        produce: "Tomato",

        quantity: 100,

        farmers: [

            {
                name: "Arun Kumar",
                quantity: 60
            },

            {
                name: "Priya",
                quantity: 40
            }

        ],

        status: "In Transit"

    };


    localStorage.setItem(
        "farmsyncOrder",
        JSON.stringify(order)
    );


    showToast(
        "Smart order created! 2 farmers matched."
    );


    setTimeout(function() {

        showPage("orders");

        loadOrder();

    }, 900);

}


/* ================= SMART ALERT ================= */

function enableAlerts() {

    showToast(
        "Smart Demand Alerts enabled!"
    );

}


/* ================= PRICE CHART ================= */

function createPriceChart() {

    const canvas =
        document.getElementById("priceChart");


    if (!canvas) {
        return;
    }


    /* If Chart.js doesn't load, don't break the app */

    if (typeof Chart === "undefined") {

        const parent =
            canvas.parentElement;

        parent.innerHTML = `

            <div style="
                height:100%;
                display:flex;
                align-items:center;
                justify-content:center;
                color:#718078;
                text-align:center;
            ">

                Price chart requires internet
                connection for Chart.js.

            </div>

        `;

        return;
    }


    new Chart(canvas, {

        type: "line",

        data: {

            labels: [
                "Mon",
                "Tue",
                "Wed",
                "Thu",
                "Fri",
                "Sat",
                "Sun"
            ],

            datasets: [

                {

                    label: "Tomato ₹/kg",

                    data: [
                        23,
                        24,
                        25,
                        24,
                        26,
                        27,
                        27
                    ],

                    tension: .4,

                    borderWidth: 3,

                    pointRadius: 4,

                    fill: true

                },

                {

                    label: "Carrot ₹/kg",

                    data: [
                        38,
                        39,
                        40,
                        41,
                        40,
                        42,
                        42
                    ],

                    tension: .4,

                    borderWidth: 2,

                    pointRadius: 3,

                    fill: false

                }

            ]

        },

        options: {

            responsive: true,

            maintainAspectRatio: false,

            plugins: {

                legend: {
                    position: "bottom"
                }

            },

            scales: {

                y: {

                    beginAtZero: false

                }

            }

        }

    });

}


/* ================= QR CODE ================= */

function createQRCode() {

    const container =
        document.getElementById("qrcode");


    if (!container) {
        return;
    }


    container.innerHTML = "";


    if (typeof QRCode === "undefined") {

        container.innerHTML = `

            <div style="
                padding:20px;
                color:#718078;
            ">

                QR preview requires internet
                connection.

            </div>

        `;

        return;

    }


    new QRCode(container, {

        text:
            "FARMSYNC | Tomato | Pollachi | Farm to Family",

        width: 150,

        height: 150

    });

}


/* ================= ORDER LOAD ================= */

function loadOrder() {

    const order =
        JSON.parse(
            localStorage.getItem(
                "farmsyncOrder"
            ) || "null"
        );


    if (!order) {
        return;
    }


    const orderTitle =
        document.querySelector(
            ".order-top h2"
        );


    if (orderTitle) {

        orderTitle.textContent =
            "#" + order.id;

    }

}


/* ================= SAFE HTML ================= */

function escapeHTML(value) {

    if (value === undefined || value === null) {
        return "";
    }


    return String(value)

        .replace(/&/g, "&amp;")

        .replace(/</g, "&lt;")

        .replace(/>/g, "&gt;")

        .replace(/"/g, "&quot;")

        .replace(/'/g, "&#039;");

}


/* =====================================================
   INITIALIZATION
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function() {


        /* ENTRY BUTTON */

        const enterBtn =
            document.getElementById("enterBtn");


        if (enterBtn) {

            enterBtn.addEventListener(
                "click",
                enterFarmSync
            );

        }


        /* FORM */

        const form =
            document.getElementById(
                "produceForm"
            );


        if (form) {

            form.addEventListener(
                "submit",
                addProduce
            );

        }


        /* RENDER */

        renderProduce();

        renderFarmerMatches();

        searchProduce();

        createPriceChart();

        createQRCode();

        loadOrder();


        /* LIVE DEMAND */

        setInterval(
            updateDemand,
            3000
        );


        console.log(
            "FARMSYNC loaded successfully."
        );

    }
);
