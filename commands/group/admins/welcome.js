const { getGroupData, group } = require('../../../mongo-DB/groupDataDb');

const handler = async (sock, msg, from, args, msgInfoObj) => {
    const { sendMessageWTyping } = msgInfoObj;
    const evv = msgInfoObj.evv;
    const grpdata = await getGroupData(from);
    let welMess = grpdata.welcome;

    if (!args[0]) {
        sendMessageWTyping(from, { text: welMess ? `Welcome Message: ${welMess}` : "No Welcome Message Set. Use the welcome command followed by a message to set a welcome message." }, { quoted: msg });
    } else {
        await group.updateOne({ _id: from }, { $set: { welcome: evv } });
        sendMessageWTyping(from, { text: `Welcome Message Set: ${evv}` }, { quoted: msg });
    }
}

module.exports.command = () => ({ cmd: ["welcome"], handler });
