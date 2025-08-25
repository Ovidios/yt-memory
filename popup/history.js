const populateHistory = async () => {
    const historyList = document.querySelector("#video-history");
    let { videos } = await browser.storage.local.get("videos");
    if (videos === undefined) videos = [];

    videos.forEach(vid => {
        let listItem = document.createElement("li");
        let link = document.createElement("a");
        let image = document.createElement("img");
        let title = document.createElement("div");

        image.src = vid.thumbnail;
        link.href = `https://youtube.com${vid.url}`;
        title.innerText = vid.title.substring(0, 50);
        if(title.innerText.length < vid.title.length) title.innerText += "…";

        link.appendChild(image);
        link.appendChild(title);
        listItem.appendChild(link);
        historyList.appendChild(listItem);
    });
}

populateHistory();