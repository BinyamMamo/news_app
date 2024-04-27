import "./styles/styles.css";

const searchBtn = document.getElementById("search-btn");
searchBtn.addEventListener("click", async () => {
    const response = await fetch("http://localhost:5000/top_headlines");
    const headlines = await response.json();
    const articles = headlines['articles'];
    const container = document.getElementById("card-container");
    
    console.clear();
    for (let article of articles) {
        console.log(article);
        const card = createCard(article);
        container.appendChild(card);
    }
});

function createCard(article) {
    const card = document.createElement("div");
    card.classList = ["card"];
    card.style.width = "18rem";

    // --------------
    // Card Thumbnail
    // --------------
    const img = document.createElement("img");
    if (article["urlToImage"] == null)
        // use a better placeholder
        img.src = "https://via.assets.so/img.jpg?w=400&h=200&tc=blue&bg=#cecece";
    else
        img.src = article["urlToImage"];
    img.classList = ["card-img-top"];

    // ---------
    // Card Body
    // ---------
    const cardBody = document.createElement("div");
    cardBody.classList = ["card-body"];

    const cardBodyTitle = document.createElement("h5");
    cardBodyTitle.classList = ["card-title"];
    cardBodyTitle.innerHTML = article["title"];
    
    const cardBodyText = document.createElement("p");
    cardBodyText.classList = ["card-text"];
    cardBodyText.innerHTML = article["content"];
    
    const modal_id = `readmore-modal-${dateTimeNow()}`;

    const readmore = document.createElement("button");
    readmore.type = "button";
    readmore.classList = ["btn btn-primary"];
    readmore.setAttribute("data-bs-toggle", "modal");
    readmore.setAttribute("data-bs-target", `#${modal_id}`);
    readmore.innerHTML = "Read more"

    cardBody.appendChild(cardBodyTitle);
    cardBody.appendChild(cardBodyText);
    cardBody.appendChild(readmore);

    const modal = document.createElement("div");
    modal.classList = ["modal fade"];
    modal.id = modal_id;
    modal.tabIndex = -1;
    modal.setAttribute("aria-labelledby", `label-${modal_id}`);
    modal.setAttribute("aria-hidden", true);

    const modalDialog = document.createElement("div");
    modalDialog.classList = ["modal-dialog"];

    const modalContent = document.createElement("div");
    modalContent.classList = ["modal-content"];

    const modalHeader = document.createElement("div");
    modalHeader.classList = ["modal-header"];
    const modalTitle = document.createElement("div");
    modalTitle.classList = ["modal-title fs-5"];
    modalTitle.id = `label-${modal_id}`;
    modalTitle.innerHTML = article['title'];
    const closeBtn = document.createElement("button");
    closeBtn.type = "button";
    closeBtn.classList = ["btn-close"];
    closeBtn.setAttribute("data-bs-dismiss", "modal");
    closeBtn.setAttribute("aria-label", "Close");
    modalHeader.appendChild(modalTitle);
    // modalHeader.appendChild(closeBtn);
    
    const modalBody = document.createElement("div");
    modalBody.classList = ["modal-body"];
    // modalBody.innerHTML = article['description'];

    const modalImage = document.createElement("img");
    if (article["urlToImage"] == null)
        // use a better placeholder
        modalImage.src = "https://via.assets.so/img.jpg?w=400&h=200&tc=blue&bg=#cecece";
    else
        modalImage.src = article["urlToImage"];
    modalImage.classList = ["card-img-top"];

    const modalBodyText = document.createElement("p");
    modalBodyText.innerHTML = article['description'];
    modalBodyText.classList = ["card-text"];

    modalBody.appendChild(modalImage);
    modalBody.appendChild(modalBodyText);

    const modalFooter = document.createElement("div");
    modalFooter.classList = ["modal-footer"];
    const CancelBtn = document.createElement("button");
    CancelBtn.type = "button";
    CancelBtn.classList = ["btn btn-secondary"];
    CancelBtn.setAttribute("data-bs-dismiss", "modal");
    CancelBtn.innerHTML = "Close";
    const viewPage = document.createElement("a");
    viewPage.classList = ["btn btn-primary"];
    viewPage.href = article['url'];
    viewPage.target = "_blank";
    viewPage.innerHTML = "Go to page";

    modalFooter.appendChild(viewPage);
    modalFooter.appendChild(CancelBtn);
    modalContent.appendChild(modalHeader);
    modalContent.appendChild(modalBody);
    modalContent.appendChild(modalFooter);
    modalDialog.appendChild(modalContent);
    modal.appendChild(modalDialog);

    card.append(img);
    card.append(cardBody);
    card.append(modal);
    return card;
}

function dateTimeNow() {
    const now = new Date();
    const year = now.getFullYear().toString();
    const month = (now.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed
    const day = now.getDate().toString().padStart(2, '0');
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const milliseconds = now.getMilliseconds().toString().padStart(3, '0'); // Ensure 3 digits

    // Combine them into a single number
    const dateTimeNumber = `${year}${month}${day}${hours}${minutes}${seconds}${milliseconds}`;
    return dateTimeNumber;
}
