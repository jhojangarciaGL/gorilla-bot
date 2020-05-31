export function parseFulfillmentMessages (fulfillmentMessages) {
    const messageType = fulfillmentMessages[0].message
    let messages
    if(messageType == 'payload') {
        messages  = fulfillmentMessages[0].payload.fields.answers.listValue.values.map(value => value.stringValue)
    } else if (messageType == 'text') {
        messages  = fulfillmentMessages[0].text.text.map(value => value)
    }

    return messages
}