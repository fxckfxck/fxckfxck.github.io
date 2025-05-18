const tonConnect = new TON_CONNECT_UI.TonConnectUI({
  manifestUrl: "https://fxckfxck.github.io/tonconnect-manifest.json",
  buttonRootId: "connect-button",
});

const walletInfo = document.getElementById("wallet-info");
const walletAddress = document.getElementById("wallet-address");
const tonBalance = document.getElementById("ton-balance");
const usdtBalance = document.getElementById("usdt-balance");
const payButton = document.getElementById("pay-button");

// Функция для обновления информации о кошельке
async function updateWalletInfo() {
  const wallet = await tonConnect.wallet;
  if (wallet) {
    walletInfo.classList.remove("hidden");
    payButton.classList.remove("hidden");
    walletAddress.textContent = wallet.account.address;

    // Здесь можно добавить логику для получения баланса TON и USDT
    // Например, используя соответствующие API или SDK
    tonBalance.textContent = "—"; // Замените на реальное значение
    usdtBalance.textContent = "—"; // Замените на реальное значение
  }
}

// Обработчик события подключения кошелька
tonConnect.onStatusChange(() => {
  updateWalletInfo();
});

// Обработчик кнопки оплаты
payButton.addEventListener("click", async () => {
  const transaction = {
    validUntil: Math.floor(Date.now() / 1000) + 60,
    messages: [
      {
        address: "UQDPFf6Y-HI_n0l5JhlKaA3McTgmx0LeeYhb4KC1pQUnE1cc",
        amount: "10000000", // Сумма в нанотонах (0.01 TON)
      },
    ],
  };

  try {
    await tonConnect.sendTransaction(transaction);
    alert("✅ Оплата успішна!");
  } catch (error) {
    console.error("Помилка при оплаті:", error);
    alert("❌ Помилка при оплаті. Спробуйте ще раз.");
  }
});
