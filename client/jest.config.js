module.exports = {
    testEnvironment: "node",
    testEnvironmentOptions: {
        "resources": "usable"
    },
    transform: {
      "^.+\\.jsx?$": "babel-jest"
    },
    "moduleNameMapper": {
        "\\.(css|less|sass|scss)$": "identity-obj-proxy",
        "\\.mp4$" : "identity-obj-proxy"
    },
    "transformIgnorePatterns": [
        "/node_modules/"
        
    ]

  };
  