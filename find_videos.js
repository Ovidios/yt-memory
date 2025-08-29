const handleVideo = video => {
    // test if on-screen
    let parent = video.closest(".ytd-rich-item-renderer, .ytd-item-section-renderer");
    if (parent === null) return null; // not sure why this happens tbh
    let rect = parent.getBoundingClientRect();
    let visible = (
        rect.bottom >= 0 &&
        rect.right >= 0 &&
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.left <= (window.innerWidth || document.documentElement.clientWidth)
    );
    if (!visible) return null;

    // sometimes, the thumbnail isn't set for some reason? in that case, also ignore it
    const thumb = parent.querySelector("img.ytCoreImageHost");
    if (thumb.attributes.getNamedItem("src") === null) return null;

    // get video
    const title = video.innerText;
    const url = video.attributes.getNamedItem("href").value;
    const thumbnail = thumb.attributes.getNamedItem("src").value;

    return {
        "title": title,
        "url": url,
        "thumbnail": thumbnail
    };
}

const findVideos = async () => {
    // get existing videos, if any
    let { videos } = await browser.storage.local.get("videos");
    if (videos === undefined) videos = [];

    // find new ones and insert into array
    document.querySelectorAll(".yt-lockup-metadata-view-model-wiz__title, .yt-lockup-metadata-view-model__title").forEach(el => {
        let video = handleVideo(el);
        if (video !== null) {
            videos = videos.filter(e => e.url != video.url);
            videos.unshift(video);
        }
    });

    // only ever save 100 videos
    videos = videos.slice(0, 100);

    // write to storage again
    await browser.storage.local.set({"videos": videos});
}

document.addEventListener("scroll", findVideos);