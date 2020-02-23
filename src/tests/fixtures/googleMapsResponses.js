exports.sampleResponse = {
  data: {
    destination_addresses: [
      "New York, NY, USA",
      "Seattle, WA, USA"
    ],
    origin_addresses: [
      "Washington, DC, USA"
    ],
    rows: [
      {
        elements: [
          {
            distance: {
              text: "364 km", value: 364002
            }, duration: {
              text: "3 hours 53 mins", value: 13959
            }, status: "OK"
          },
          {
            distance: {
              text: "4,458 km", value: 4457977
            }, duration: {
              text: "1 day 17 hours", value: 148082
            }, status: "OK"
          }
        ]
      }
    ], status: "OK"
  }
};