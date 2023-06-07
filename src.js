

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

// This function made by ChatGPT
function generateTable(object) {
    var keys = Object.keys(object);
    
    var table = document.createElement('table');
    
    // Create table header
    var headerRow = document.createElement('tr');
    keys.forEach(function(key) {
        var th = document.createElement('th');
        th.textContent = key;
        headerRow.appendChild(th);
    });
    table.appendChild(headerRow);
    
    // Create table body
    var tbody = document.createElement('tbody');

    var row = document.createElement('tr');
    keys.forEach(function(key) {
        var td = document.createElement('td');
        td.textContent = object[key];
        row.appendChild(td);
    });
    tbody.appendChild(row);

    table.appendChild(tbody);
    
    return table;
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

function prettify(probs) {
    for (const key in probs) {
        probs[key] = String(probs[key] * 100.).substring(0, 4) + "%";
    }
    return probs
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

            // return softmax(sum_vals);
            console.log(sum_vals);
            table = generateTable(prettify(softmax(sum_vals)))
            document.getElementById("tableContainer").appendChild(table)

        })
}
