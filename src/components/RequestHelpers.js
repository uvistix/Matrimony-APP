// RequestHelpers.js

const STATUS = {
  PENDING: "request pending",
  ACCEPTED: "request accepted",
  REJECTED: "request rejected",
  REQUESTED_AGAIN: "requested again",
};

const getUidFromItem = (item, isSentRequest) => {
  return isSentRequest ? item.receiverData.uid : item.senderData.uid;
};

const isRequestAccepted = (item, requestsReceived, requestsSent, isSentRequest) => {
  const uid = getUidFromItem(item, isSentRequest);

  const receivedItem = requestsReceived.find(
    (receivedItem) => receivedItem.senderData.uid === uid
  );

  const isReceivedAccepted = receivedItem && receivedItem.status === STATUS.ACCEPTED;

  const sentItem = requestsSent.find(
    (sentItem) => sentItem.receiverData.uid === uid
  );
  const isSentAccepted = sentItem && sentItem.status === STATUS.ACCEPTED;

  return isReceivedAccepted || isSentAccepted;
};

const isRequestSent = (item, requestsReceived, requestsSent, isSentRequest) => {
  const uid = getUidFromItem(item, isSentRequest);

  const sentItem = requestsSent.find(
    (sentItem) => sentItem.receiverData.uid === uid
  );

  const isSentPendingOrRequestedAgain =
    sentItem &&
    (sentItem.status === STATUS.PENDING || sentItem.status === STATUS.REQUESTED_AGAIN);

  const isAccepted = isRequestAccepted(item, requestsReceived, requestsSent, isSentRequest);

  return isSentPendingOrRequestedAgain && !isAccepted;
};

const isRequestRejected = (item, requestsReceived, requestsSent, isSentRequest) => {
  const uid = getUidFromItem(item, isSentRequest);

  const sentItem = requestsSent.find(
    (sentItem) => sentItem.receiverData.uid === uid
  );

  const isSentRejected = sentItem && sentItem.status === STATUS.REJECTED;

  const isAccepted = isRequestAccepted(item, requestsReceived, requestsSent, isSentRequest);
  const isReceived = isRequestReceived(item, requestsReceived, requestsSent, isSentRequest);

  return isSentRejected && !isAccepted && !isReceived;
};

const isRequestReceived = (item, requestsReceived, requestsSent, isSentRequest) => {
  const uid = getUidFromItem(item, isSentRequest);

  const receivedItem = requestsReceived.find(
    (receivedItem) => receivedItem.senderData.uid === uid
  );

  const isReceivedPendingOrRequestedAgain =
    receivedItem &&
    (receivedItem.status === STATUS.PENDING || receivedItem.status === STATUS.REQUESTED_AGAIN);

  const isAccepted = isRequestAccepted(item, requestsReceived, requestsSent, isSentRequest);

  return isReceivedPendingOrRequestedAgain && !isAccepted;
};

export { isRequestAccepted, isRequestSent, isRequestRejected, isRequestReceived };
