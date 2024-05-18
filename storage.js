<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>LocalStorage with Expiry</title>
</head>
<body>
    <h1>LocalStorage with Expiry Example</h1>
    <button onclick="setLocalStorageItem()">Set Item</button>
    <button onclick="getLocalStorageItem()">Get Item</button>
    <button onclick="checkExpiry()">Check Expiry</button>

    <p id="output"></p>

    <script>
        (function() {
            // Extending the localStorage object
            window.localStorageWithExpiry = {
                setItem: function(key, value, expiryInSeconds) {
                    const now = Date.now(); // Current time in milliseconds
                    const expiryTime = now + expiryInSeconds * 1000; // Convert expiry time to milliseconds

                    // Create an object to store the value and the expiry time
                    const item = {
                        value: value,
                        expiry: expiryTime
                    };

                    // Store the item in localStorage as a JSON string
                    localStorage.setItem(key, JSON.stringify(item));
                },

                getItem: function(key) {
                    // Retrieve the item from localStorage
                    const itemStr = localStorage.getItem(key);

                    // If the item doesn't exist, return undefined
                    if (!itemStr) {
                        return undefined;
                    }

                    // Parse the JSON string to an object
                    const item = JSON.parse(itemStr);
                    const now = Date.now(); // Current time in milliseconds

                    // Check if the item has expired
                    if (now > item.expiry) {
                        // If the item has expired, remove it from localStorage and return undefined
                        localStorage.removeItem(key);
                        return undefined;
                    }

                    // If the item has not expired, return its value
                    return item.value;
                }
            };
        })();

        function setLocalStorageItem() {
            window.localStorageWithExpiry.setItem("key1", "value", 10); // 10 seconds expiry
            document.getElementById('output').innerText = "Item set with 10 seconds expiry.";
        }

        function getLocalStorageItem() {
            const value = window.localStorageWithExpiry.getItem("key1");
            document.getElementById('output').innerText = value ? `Retrieved value: ${value}` : "Item not found or expired.";
        }

        function checkExpiry() {
            setTimeout(function() {
                const value = window.localStorageWithExpiry.getItem("key1");
                document.getElementById('output').innerText = value ? `Retrieved value: ${value}` : "Item not found or expired.";
            }, 11000); // 11 seconds to ensure the item has expired
        }
    </script>
</body>
</html>
