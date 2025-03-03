document.addEventListener('DOMContentLoaded', () => {
    const webhookInput = document.getElementById('webhookUrl');
    const saveBtn = document.getElementById('saveBtn');

    chrome.storage.sync.get(['webhookUrl'], (result) => {
        if (result.webhookUrl) webhookInput.value = result.webhookUrl;
    });

    saveBtn.addEventListener('click', () => {
        chrome.storage.sync.set({ webhookUrl: webhookInput.value }, () => {
            alert('Webhook URL saved!');
        });
    });
});