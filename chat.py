from flask import Flask, request, jsonify, render_template_string
from flask_cors import CORS
#CORS(app)
app = Flask(__name__)
CORS(app)
user_state = {}

HTML_PAGE = """
<!DOCTYPE html>
<html>
<head>
<title>Poton - All Solutions in One</title>

<style>
body {
    font-family: Arial;
    background: #f0f2f5;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}
.chat-container {
    width: 420px;
    height: 600px;
    background: white;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
}
.header {
    background: #4CAF50;
    color: white;
    padding: 15px;
    text-align: center;
    font-size: 18px;
}
#chat {
    flex: 1;
    padding: 10px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
}
.message {
    padding: 10px;
    margin: 5px;
    border-radius: 10px;
    max-width: 75%;
}
.user {
    background: #DCF8C6;
    align-self: flex-end;
}
.bot {
    background: #e4e6eb;
    align-self: flex-start;
}
.input-box {
    display: flex;
    border-top: 1px solid #ccc;
}
.input-box input {
    flex: 1;
    padding: 12px;
    border: none;
    outline: none;
}
.input-box button {
    padding: 12px;
    background: #4CAF50;
    color: white;
    border: none;
    cursor: pointer;
}
</style>
</head>

<body>

<div class="chat-container">

<div class="header">🤖 Poton (All Solutions in One)</div>

<div id="chat"></div>

<div class="input-box">
<input id="msg" placeholder="Type your message..." onkeypress="if(event.key==='Enter') send()" />
<button onclick="send()">Send</button>
</div>

</div>

<script>
function addMessage(text, type) {
    let chat = document.getElementById("chat");
    let msg = document.createElement("div");
    msg.classList.add("message", type);

    // FIX for newline issue
    msg.innerHTML = text.replace(/\\\\n/g, "<br>").replace(/\\n/g, "<br>");

    chat.appendChild(msg);
    chat.scrollTop = chat.scrollHeight;
}

// Greeting
window.onload = function() {
    addMessage("👋 Hi! I am Poton.<br>How can I help you today?<br><br>You can ask:<br>- Book cab<br>- Order grocery<br>- Buy shoes<br>- Order food<br>- Medicine help", "bot");
};

function send(){
    let input = document.getElementById("msg");
    let text = input.value;

    if(text.trim() === "") return;

    addMessage(text, "user");

    fetch("/chat", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({message:text})
    })
    .then(res=>res.json())
    .then(data=>{
        setTimeout(()=>{
            addMessage(data.reply, "bot");
        }, 400);
    });

    input.value="";
}
</script>

</body>
</html>
"""

@app.route("/")
def home():
    return render_template_string(HTML_PAGE)

@app.route("/chat", methods=["POST"])
def chat():
    user_input = request.json["message"].lower()
    user_id = "default"
    state = user_state.get(user_id, {})

    # -------- CAB --------
    if "cab" in user_input and not state:
        user_state[user_id] = {"intent": "cab"}
        return jsonify({"reply": "🚕 What time do you need the cab?"})

    if state.get("intent") == "cab":
        user_state[user_id] = {}
        return jsonify({
            "reply": f"✅ Cab booked for {user_input} 🚕 Cab number: DL-01-1234"
        })

    # -------- GROCERY --------
    if "grocery" in user_input:
        user_state[user_id] = {"intent": "grocery"}
        return jsonify({"reply": "🛒 What items do you want?"})

    if state.get("intent") == "grocery":
        user_state[user_id] = {}
        return jsonify({
            "reply": f"🧾 Order placed! Items: {user_input} | Total: ₹150 💳 Pay at delivery"
        })

    # -------- SHOES --------
    if "shoes" in user_input:
        user_state[user_id] = {"intent": "shoes"}
        return jsonify({"reply": "👟 What type of shoes? (sports / casual)"})

    if state.get("intent") == "shoes":
        user_state[user_id] = {"intent": "shoes_platform", "type": user_input}
        return jsonify({
            "reply": f"🛍️ Options for {user_input} shoes:<br>Amazon ₹999<br>Flipkart ₹799<br>eBay ₹500<br><br>Which one do you want?"
        })

    if state.get("intent") == "shoes_platform":
        platform = user_input
        price = "999" if "amazon" in platform else "799" if "flipkart" in platform else "500"

        user_state[user_id] = {}

        return jsonify({
            "reply": f"🛒 Order confirmed from {platform.capitalize()}! 👟 {state.get('type')} shoes | ₹{price} 💳 Payment done 🚚 Delivery in 2 days"
        })

    # -------- FOOD --------
    if "food" in user_input:
        user_state[user_id] = {"intent": "food_platform"}
        return jsonify({"reply": "🍔 From where? Swiggy or Zomato?"})

    if state.get("intent") == "food_platform":
        user_state[user_id] = {"intent": "food_items", "platform": user_input}
        return jsonify({"reply": "🍽️ What food items do you want?"})

    if state.get("intent") == "food_items":
        platform = state.get("platform")
        user_state[user_id] = {}
        return jsonify({
            "reply": f"🍕 Order placed on {platform.capitalize()} | Items: {user_input} 💰 Total: ₹250 💳 Payment successful 🚚 Coming soon!"
        })

    # -------- HEALTH --------
    if "fever" in user_input or "not well" in user_input:
        user_state[user_id] = {"intent": "health"}
        return jsonify({"reply": "🤒 Please enter medicine name from prescription."})

    if state.get("intent") == "health":
        user_state[user_id] = {}
        return jsonify({
            "reply": f"💊 Medicine order placed: {user_input} 🧾 Invoice ₹120 💳 Pay at delivery 🚚 Delivered today"
        })

    # -------- DEFAULT --------
    return jsonify({
        "reply": "🤖 I can help with cab, grocery, shoes, food, or medicine."
    })


if __name__ == "__main__":
    app.run(port=5000, debug=False, use_reloader=False)