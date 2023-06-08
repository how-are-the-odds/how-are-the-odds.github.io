

function req() {
    const data = null;

    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener('readystatechange', function () {
        if (this.readyState === this.DONE) {
            console.log(this.responseText);
        }
    });

    xhr.open('GET', 'https://baseballapi.p.rapidapi.com/api/baseball/matches/live');
    xhr.setRequestHeader('X-RapidAPI-Key', 'ed311e3189mshe2f80deb420795bp13a624jsna681c593c9f5');
    xhr.setRequestHeader('X-RapidAPI-Host', 'baseballapi.p.rapidapi.com');

    xhr.send(data);
}

async function get_batter_names() {
    json = fetch('./data/model_params/batter_fit.json')
        .then((response) => response.json())
        .then((json) => (Object.keys(json)))
    return json
}

async function get_pitcher_names() {
    json = fetch('./data/model_params/pitcher_fit.json')
        .then((response) => response.json())
        .then((json) => (Object.keys(json)))
    return json
}

function prettify(prob) {
    return String(prob * 100.).substring(0, 4) + "%";
}

function prob_to_color(prob) {
    const low_prob_color = [244, 232, 197];
    const high_prob_color = [201, 45, 2];
    let color_output = [];
    for (var i = 0; i < 3; i++) {
        color_output[i] = parseInt(low_prob_color[i] * (1 - prob) + high_prob_color[i] * prob);
    }
    const colorString = "#" + color_output[0].toString(16).padStart(2, '0') + color_output[1].toString(16).padStart(2, '0') + color_output[2].toString(16).padStart(2, '0');
    return colorString;
}

function generateTableRow(object, event) {
    let keys = Object.keys(object);
    
    let table_body = document.getElementById('probTableBody');
    
    // Create table body
    let row = document.createElement('tr');
    row.classList.add("prob-tr");
    let td_1 = document.createElement('td');
    td_1.textContent = event[0] + " \n " + event[1] + " \n " + event[2];
    td_1.style.backgroundColor = "#77BBFF";
    td_1.classList.add("prob-td");
    row.appendChild(td_1);
    keys.forEach(function(key) {
        let td = document.createElement('td');
        td.textContent = prettify(object[key]);
        td.classList.add("prob-td");
        td.style.backgroundColor = prob_to_color(object[key]);
        row.appendChild(td);
    });
    table_body.appendChild(row);
}

// Function for computing the softmax of an object:
function softmax(obj) {
    summand = 0;
    obj_exp = {};
    for (const key in obj) {
        summand += Math.exp(obj[key]);
        obj_exp[key] = Math.exp(obj[key]);
    }

    for (const key in obj_exp) {
        obj_exp[key] = obj_exp[key] / summand;
    }

    return obj_exp;
}

async function get_batter_vec(batter_name) {
    json = fetch('./data/model_params/batter_fit.json')
        .then((response) => response.json())
        .then((json) => (json[batter_name]))

    return json
}

async function get_pitcher_vec(pitcher_name) {
    json = fetch('./data/model_params/pitcher_fit.json')
        .then((response) => response.json())
        .then((json) => (json[pitcher_name]))

    return json
}

async function get_count_offset() {
    json = fetch('./data/model_params/count_fit.json')
        .then((response) => response.json())

    return json
}

function get_input_prob() {
    batter_name_input = document.getElementById("batter_name").value
    pitcher_name_input = document.getElementById("pitcher_name").value
    balls_input = document.getElementById("balls").value
    strikes_input = document.getElementById("strikes").value
    count_input = "(" + balls_input + ", " + strikes_input + ")"
    get_prob(batter_name_input, pitcher_name_input, count_input)
}

async function get_prob(batter, pitcher, count) {
    batter_vec = get_batter_vec(batter);
    pitcher_vec = get_pitcher_vec(pitcher);
    count_offset = get_count_offset();
    Promise.all(([batter_vec, pitcher_vec, count_offset]))
        .then(function (values) {
            [batter_vec, pitcher_vec, count_offset] = values;
            let product_vals = {};
            for (const key in batter_vec) {
                product_vals[key] = batter_vec[key] * pitcher_vec[key];
            }
            let sum_vals = {};
            let count_offset_spec = count_offset[count]
            for (const key in count_offset_spec) {
                sum_vals[key] = count_offset_spec[key];
            }
            for (const key in product_vals) {
                split_key = key.split(",")[0]
                sum_vals[split_key.substr(2, split_key.length - 3)] += product_vals[key];
            }

            table = generateTableRow(softmax(sum_vals), [batter, pitcher, count]);
        })
}

const name_converter = new Map([
    ["doubletriple_hit", "Double or Triple"],
    ["fielded_out", "Fielded Out"],
    ["homerun_hit", "Home Run"],
    ["other", "Other"],
    ["single_hit", "Single (hit)"],
    ["single_walk", "Walk"],
    ["strike_out", "Strike Out"]
]);


async function add_table_header() {
    get_count_offset()
        .then(function (count_offset) {
            let events = Object.keys(count_offset['(0, 0)'])
                .map((event) => name_converter.get(event));
            let table = document.getElementById("oddsTable");

            let headerRow = document.createElement('tr');
            let th_1 = document.createElement('th');
            th_1.textContent = "Event Name";
            headerRow.appendChild(th_1);

            events.forEach(function(key) {
                let th = document.createElement('th');
                th.textContent = key;
                headerRow.appendChild(th);
            });
            table.appendChild(headerRow);
            let table_body = document.createElement("tbody");
            table_body.id = "probTableBody";
            table.appendChild(table_body);
        })
}

get_batter_names().then(function (value) {
    autocomplete(document.getElementById("batter_name"), value)
})
get_pitcher_names().then(function (value) {
    autocomplete(document.getElementById("pitcher_name"), value)
})
add_table_header()