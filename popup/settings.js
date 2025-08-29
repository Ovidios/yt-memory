const form = document.querySelector("#settings-form");

const loadSettings = async () => {
    let { settings } = await browser.storage.local.get("settings");
    if (settings === undefined) settings = {
        videoCount: 100
    };

    form.video_count.value = settings.videoCount
}

const saveSettings = async () => {
    await browser.storage.local.set({"settings": {
        videoCount: form.video_count.value
    }});
}

const validateInput = () => {
    
}

document.querySelector("")