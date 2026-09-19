import textwrap
import io

html_template = """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Menu | Walnut Bakery</title>
    <link rel="stylesheet" href="style.css?v=14">
</head>
<body class="menu-page-body" style="padding: 4rem 5%;">
    <div style="text-align: center; margin-bottom: 4rem;">
        <h2 class="serif" style="color: var(--deep-espresso); font-size: 2rem;">Walnut Bakery Menu</h2>
        <a href="index.html" style="color: var(--champagne-gold); text-decoration: none; text-transform: uppercase; font-size: 0.9rem; letter-spacing: 2px;">&larr; Back to Home</a>
    </div>

    <main id="menu-app" style="max-width: 1200px; margin: 0 auto;">
{menu_content}
    </main>
</body>
</html>
"""

menu_data = [
    {
        "id": "fusion",
        "title": "FUSION PLATES & MEALS",
        "subcategories": [
            {
                "title": "",
                "items": [
                    {"name": "Spaghetti Cheese Waffles", "price": ""},
                    {"name": "South African Bunny Chow Paneer Tikka", "price": ""},
                    {"name": "Chinese Bowl", "price": ""},
                    {"name": "Indian Rice Bowl", "price": ""},
                    {"name": "Paneer Bhurji Pao", "price": ""}
                ]
            }
        ]
    },
    {
        "id": "kids",
        "title": "KIDS MENU",
        "subcategories": [
            {
                "title": "",
                "items": [
                    {"name": "Molten Cheese Balls — 6 pcs", "price": ""},
                    {"name": "Mac-N-Cheese", "price": ""},
                    {"name": "Happy Meal", "price": ""},
                    {"name": "Choco Strawberry Milkshake — Small", "price": ""}
                ]
            }
        ]
    },
    {
        "id": "italian",
        "title": "ITALIAN",
        "subcategories": [
            {
                "title": "PIZZA",
                "items": [
                    {"name": "Margherita", "price": "₹190"},
                    {"name": "Farmhouse", "price": "₹210"},
                    {"name": "Paneer Makhni Pizza", "price": "₹230"},
                    {"name": "Three Cheese Pizza", "price": ""},
                    {"name": "Napolitana with Bocconcini Cheese", "price": ""},
                    {"name": "Walnut 10 Topping Pizza", "price": ""}
                ]
            },
            {
                "title": "PASTA",
                "items": [
                    {"name": "Whole Wheat Penne Arrabita", "price": "₹190"},
                    {"name": "Whole Wheat Penne Alfredo", "price": ""},
                    {"name": "Spaghetti in Pesto Sauce", "price": ""}
                ]
            },
            {
                "title": "BRUSCHETTA",
                "items": [
                    {"name": "Tomato with Basil, Cheddar & Parmesan Cheese", "price": ""},
                    {"name": "Sauteed Mushroom & Cheese", "price": ""}
                ]
            }
        ]
    },
    {
        "id": "mexican",
        "title": "MEXICAN CUISINE",
        "subcategories": [
            {
                "title": "",
                "items": [
                    {"name": "Cheese Quesadilla", "price": ""},
                    {"name": "Burrito", "price": ""},
                    {"name": "Tacos", "price": ""},
                    {"name": "Loaded Home Made Nachos", "price": ""}
                ]
            }
        ]
    },
    {
        "id": "lebanese",
        "title": "LEBANESE CUISINE",
        "subcategories": [
            {
                "title": "",
                "items": [
                    {"name": "Stuffed Falafel Pita Bread", "price": ""},
                    {"name": "Falafel with Warm Pita on the Side & Hummus", "price": ""},
                    {"name": "Lebanese Platter", "price": ""}
                ]
            }
        ]
    },
    {
        "id": "american",
        "title": "AMERICAN",
        "subcategories": [
            {
                "title": "FRIES",
                "items": [
                    {"name": "Walnut Classic Fries", "price": "₹90"},
                    {"name": "Cheesy Fries", "price": ""},
                    {"name": "Paneer Makhni Fries", "price": ""}
                ]
            },
            {
                "title": "BURGERS",
                "items": [
                    {"name": "Classic Veg Decker Burger", "price": ""},
                    {"name": "Paneer Makhni Burger", "price": ""},
                    {"name": "Mexican Bean & Nacho Burger", "price": ""},
                    {"name": "Messy Molten Cheese Burger @LIVE", "price": ""}
                ]
            },
            {
                "title": "ADD-ONS",
                "items": [
                    {"name": "Extra Cheese", "price": ""}
                ]
            }
        ]
    },
    {
        "id": "soups",
        "title": "SOUPS & SALADS",
        "subcategories": [
            {
                "title": "SOUPS",
                "items": [
                    {"name": "Tomato Basil", "price": ""},
                    {"name": "Cream of Mushroom", "price": ""},
                    {"name": "Broccoli Walnut Soup", "price": ""},
                    {"name": "Minestrone", "price": ""},
                    {"name": "Tortilla Soup", "price": ""},
                    {"name": "Burmese Khow Suey", "price": ""}
                ]
            },
            {
                "title": "SALADS",
                "items": [
                    {"name": "Caesar Salad", "price": ""},
                    {"name": "Protein Salad", "price": ""},
                    {"name": "Home Made Roasted Nacho Salad", "price": ""}
                ]
            }
        ]
    },
    {
        "id": "sandwiches",
        "title": "SANDWICHES",
        "subcategories": [
            {
                "title": "",
                "items": [
                    {"name": "Walnut Classic Club Sandwich", "price": ""},
                    {"name": "Mumbai Masala Sandwich", "price": ""},
                    {"name": "Mushroom & Baked Bean Cheese Sandwich", "price": ""},
                    {"name": "Paneer Makhni Sandwich", "price": ""},
                    {"name": "Walnut Special Subs in Multigrain Bread", "price": ""}
                ]
            },
            {
                "title": "ADD-ONS",
                "items": [
                    {"name": "Extra Cheese", "price": ""}
                ]
            }
        ]
    },
    {
        "id": "coffee",
        "title": "COFFEE & BEVERAGES",
        "subcategories": [
            {
                "title": "COLD COFFEES",
                "items": [
                    {"name": "Classic Cold Coffee", "price": ""},
                    {"name": "Cold Mocha", "price": ""},
                    {"name": "Caramel Frappe", "price": ""},
                    {"name": "Dark Chocolate Mocha", "price": ""},
                    {"name": "Java Choco-Chip Frappe", "price": ""},
                    {"name": "Cold Hazelnut Latte", "price": ""}
                ]
            },
            {
                "title": "FRAPPES & MILKSHAKES",
                "items": [
                    {"name": "Chocolate Milkshake", "price": ""},
                    {"name": "Strawberry Milkshake", "price": ""},
                    {"name": "Cookies 'N' Cream Frappe", "price": ""},
                    {"name": "Bubblegum Frappe", "price": ""},
                    {"name": "Thandai Frappe", "price": ""},
                    {"name": "Salted Caramel Frappe", "price": ""},
                    {"name": "The Protein Shake", "price": ""},
                    {"name": "Belgian Chocolate Milkshake", "price": ""},
                    {"name": "Dark Chocolate Cake Shake", "price": ""}
                ]
            },
            {
                "title": "HOT BEVERAGES",
                "items": [
                    {"name": "Cappuccino", "price": ""},
                    {"name": "Latte", "price": ""},
                    {"name": "Mocha", "price": ""},
                    {"name": "Espresso", "price": ""},
                    {"name": "Americano", "price": ""},
                    {"name": "Macchiato", "price": ""},
                    {"name": "Add Flavor to Your Latte", "price": ""},
                    {"name": "Classic Hot Chocolate", "price": ""},
                    {"name": "Signature Hot Chocolate with Toasted Marshmallows", "price": ""},
                    {"name": "Seductive Threesome Hot Chocolate", "price": ""},
                    {"name": "Vegan & Lactose Intolerance — Switch to Oat Milk", "price": ""}
                ]
            },
            {
                "title": "MOCKTAILS & MOJITOS",
                "items": [
                    {"name": "Lemon Ice Tea / Green Apple Chiller / Blue Lagoon", "price": ""},
                    {"name": "Virgin Mojito / Black Currant Mojito / Kiwi Mojito", "price": ""}
                ]
            }
        ]
    },
    {
        "id": "desserts",
        "title": "DESSERTS",
        "subcategories": [
            {
                "title": "PLATED DESSERTS",
                "items": [
                    {"name": "Choco Fudge Sundae", "price": ""},
                    {"name": "Oreo Cookie Sundae", "price": ""}
                ]
            },
            {
                "title": "WAFFLES",
                "items": [
                    {"name": "Classic Waffles", "price": ""},
                    {"name": "Nutella Waffles", "price": ""},
                    {"name": "Belgian Chocolate Waffles", "price": ""}
                ]
            },
            {
                "title": "ICE CREAM DESSERTS",
                "items": [
                    {"name": "Tempura Fried Ice Cream", "price": ""},
                    {"name": "Warm Apple Pie with Ice Cream", "price": ""},
                    {"name": "Sizzling Cocoa Butter Brownie with Ice Cream", "price": ""},
                    {"name": "Warm Walnut Pie with Ice Cream", "price": ""}
                ]
            }
        ]
    }
]

content = ""
for cat in menu_data:
    content += f'        <div style="margin-top: 3rem; margin-bottom: 2rem;">\n'
    content += f'            <h2 class="serif" style="color: var(--champagne-gold); border-bottom: 1px solid rgba(0,0,0,0.1); padding-bottom: 0.5rem; text-align: left; font-size: 1.8rem;">{cat["title"]}</h2>\n'
    content += '        </div>\n'
    
    for subcat in cat["subcategories"]:
        if subcat["title"]:
            content += f'        <h3 style="margin-top: 1.5rem; margin-bottom: 1rem; color: var(--deep-espresso); font-size: 1.1rem; text-transform: uppercase; text-align: left;">{subcat["title"]}</h3>\n'
        
        content += '        <div class="menu-grid-2col" style="margin-bottom: 2rem;">\n'
        for item in subcat["items"]:
            data_name = item["name"].replace('"', '&quot;')
            content += f'            <div class="menu-item-row" data-name="{data_name}">\n'
            content += f'                <div class="menu-item-details"><h4 class="menu-item-name">{item["name"]}</h4></div>\n'
            content += '                <div class="menu-item-leader"></div>\n'
            content += f'                <div class="menu-item-price">{item["price"]}</div>\n'
            content += '            </div>\n'
        content += '        </div>\n'

html_out = html_template.replace("{menu_content}", content)

with io.open("menu.html", "w", encoding="utf-8") as f:
    f.write(html_out)

print("menu.html generated successfully!")
