document.addEventListener('DOMContentLoaded', async () => {
    const titleInput = document.getElementById('title');
    const linkInput = document.getElementById('link');
    const messageInput = document.getElementById('message');
    const sendBtn = document.getElementById('sendBtn');

    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    linkInput.value = tab.url;
    
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: () => {
            const postTitleElement = document.querySelector('[data-tag="post-title"]');
            return postTitleElement ? postTitleElement.textContent : document.title;
        }
    }).then(([result]) => {
        titleInput.value = result.result;
    }).catch(() => {
        titleInput.value = document.title;
    });

    sendBtn.addEventListener('click', async () => {
        const { webhookUrl, botName, embedColor, webhookLogo, roleId } = await getSettings();
        if (!webhookUrl) return alert('Webhook URL not set in options.');

        const rolePing = roleId ? `<@&${roleId}> ` : '';
        const log = document.getElementById('log');

        const embed = {
            username: botName || "From Patreon",
            avatar_url: webhookLogo || "https://github.com/Newfies/P2D/blob/main/res/icons/patreon.png?raw=true",
            content: rolePing + messageInput.value,
            embeds: [{
                title: titleInput.value,
                url: linkInput.value,
                color: parseInt((embedColor || "#bb2222").replace('#', ''), 16)
            }]
        };

        fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(embed),
        })
        .then((res) => {
            if (res.ok) {
            log.innerHTML = "Message sent!";
            } else {
            log.innerHTML = "Failed to send message.";
            }
        })
        .catch((err) => {
            log.innerHTML = "Error: " + err.message;
        });
    });

    async function getSettings() {
        return new Promise(resolve => {
            chrome.storage.sync.get(["webhookUrl", "botName", "embedColor", "webhookLogo", "roleId"], (result) => {
                resolve(result);
            });
        });
    }
});