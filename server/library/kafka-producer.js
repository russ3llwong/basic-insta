class KafkaProducerLibrary {
  constructor(kafkaProducer) {
    this.kafkaProducer = kafkaProducer;
  }

  produceMessage(topic, message) {
    let updateFeedPayload = [{
      topic: topic,
      messages: message !== null ? message : topic
    }];

    return this.kafkaProducer.send(updateFeedPayload, (err, data) => {
      if (err) {
        console.log(`[kafka-producer => ${topic}]: UPDATE FAILED`);
        console.log(err)
      } else {
        console.log(`[kafka-producer => ${topic}]: UPDATE SUCCESS`);
      }
    });
  };
}

module.exports = KafkaProducerLibrary;