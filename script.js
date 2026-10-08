
let cart = [];

function addToCart(name, price) {

    cart.push({
        name: name,
        price: price
    });

    updateCart();

    alert(
        name +
        " berhasil ditambahkan ke keranjang!"
    );
}

function updateCart() {

    const cartCount =
        document.getElementById("cart-count");

    const cartItems =
        document.getElementById("cart-items");

    const totalPrice =
        document.getElementById("total-price");

    cartCount.textContent =
        cart.length;

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p class="empty">
                Belum ada produk
                di keranjang.
            </p>
        `;

        totalPrice.textContent =
            "Rp0";

        return;
    }

    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach(function(item, index) {

        total += item.price;


        cartItems.innerHTML += `

            <div class="cart-product">

                <div>

                    <strong>
                        ${item.name}
                    </strong>

                    <small>
                        ${formatRupiah(item.price)}
                    </small>

                </div>

                <button
                    class="remove-btn"
                    onclick="removeItem(${index})"
                >
                    Hapus
                </button>

            </div>

        `;

    });

    totalPrice.textContent =
        formatRupiah(total);
}

function removeItem(index) {

    cart.splice(index, 1);

    updateCart();

}

function formatRupiah(number) {

    return new Intl.NumberFormat(
        "id-ID",
        {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0
        }
    ).format(number);

}

document
    .getElementById("payment-form")
    .addEventListener(
        "submit",
        function(event) {

            event.preventDefault();

            if (cart.length === 0) {

                alert(
                    "Silakan pilih produk terlebih dahulu!"
                );

                document
                    .getElementById("produk")
                    .scrollIntoView({
                        behavior: "smooth"
                    });

                return;
            }

            const nama =
                document
                    .getElementById("nama")
                    .value;

            const telepon =
                document
                    .getElementById("telepon")
                    .value;

            const alamat =
                document
                    .getElementById("alamat")
                    .value;

            const metode =
                document
                    .getElementById("metode")
                    .value;

            const invoiceNumber =
                "FK-" +
                Math.floor(
                    Math.random() *
                    900000 +
                    100000
                );

            let total = 0;

            cart.forEach(function(item) {
                total += item.price;
            });

            document
                .getElementById("invoice")
                .innerHTML = `

                    <strong>
                        Invoice:
                    </strong>
                    ${invoiceNumber}

                    <br>

                    <strong>
                        Pembeli:
                    </strong>
                    ${nama}

                    <br>

                    <strong>
                        WhatsApp:
                    </strong>
                    ${telepon}

                    <br>

                    <strong>
                        Pembayaran:
                    </strong>
                    ${metode}

                    <br>

                    <strong>
                        Total:
                    </strong>
                    ${formatRupiah(total)}

                `;

            document
                .getElementById("success-modal")
                .style.display = "flex";

            cart = [];

            updateCart();

            document
                .getElementById("payment-form")
                .reset();
        }
    );

function closeModal() {

    document
        .getElementById("success-modal")
        .style.display = "none";

}