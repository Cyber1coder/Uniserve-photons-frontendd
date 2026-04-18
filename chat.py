from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

user_state = {}

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