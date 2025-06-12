
let blockchain = [];
const difficulty = 3;

function calculateHash(index, timestamp, data, previousHash, nonce) {
  return CryptoJS.SHA256(index + timestamp + data + previousHash + nonce).toString();
}

function mineBlock(index, timestamp, data, previousHash) {
  let nonce = 0;
  let hash = calculateHash(index, timestamp, data, previousHash, nonce);
  while (hash.substring(0, difficulty) !== "0".repeat(difficulty)) {
    nonce++;
    hash = calculateHash(index, timestamp, data, previousHash, nonce);
  }
  return { nonce, hash };
}

function addBlock() {
  const index = blockchain.length;
  const timestamp = new Date().toISOString();
  const data = "Block #" + index;
  const previousHash = index > 0 ? blockchain[blockchain.length - 1].hash : "0";
  const mined = mineBlock(index, timestamp, data, previousHash);
  const newBlock = {
    index,
    timestamp,
    data,
    previousHash,
    nonce: mined.nonce,
    hash: mined.hash
  };
  blockchain.push(newBlock);
  renderBlockchain();
}

function renderBlockchain() {
  const container = document.getElementById("blockchain");
  container.innerHTML = "";
  blockchain.forEach(block => {
    const blockDiv = document.createElement("div");
    blockDiv.className = "block";
    blockDiv.innerHTML = `<strong>Index:</strong> ${block.index}<br>
                          <strong>Time:</strong> ${block.timestamp}<br>
                          <strong>Data:</strong> ${block.data}<br>
                          <strong>Nonce:</strong> ${block.nonce}<br>
                          <strong>Prev Hash:</strong> ${block.previousHash}<br>
                          <strong>Hash:</strong> ${block.hash}`;
    container.appendChild(blockDiv);
  });
}
