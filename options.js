document.addEventListener('DOMContentLoaded', () => {
    const webhookInput = document.getElementById('webhookUrl');
    const botNameInput = document.getElementById('botName');
    const embedColorInput = document.getElementById('embedColor');
    const webhookLogoInput = document.getElementById('webhookLogo');
    const roleIdInput = document.getElementById('roleId');
    const saveBtn = document.getElementById('saveBtn');

    chrome.storage.sync.get(["webhookUrl", "botName", "embedColor", "webhookLogo", "roleId"], (result) => {
        if (result.webhookUrl) webhookInput.value = result.webhookUrl;
        if (result.botName) botNameInput.value = result.botName;
        if (result.embedColor) embedColorInput.value = result.embedColor;
        if (result.webhookLogo) webhookLogoInput.value = result.webhookLogo;
        if (result.roleId) roleIdInput.value = result.roleId;
    });

    saveBtn.addEventListener('click', () => {
        chrome.storage.sync.set({
            webhookUrl: webhookInput.value,
            botName: botNameInput.value,
            embedColor: embedColorInput.value,
            webhookLogo: webhookLogoInput.value,
            roleId: roleIdInput.value
        }, () => {
            alert('Settings saved!');
        });
    });
});
