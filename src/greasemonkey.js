const express = require("express");
const path = require("path");
const wget = require("wget-improved");

const router = express.Router();

function sendGreasemonkeyFile(fileName, req, res) {
  const download = wget.download(
    `https://raw.githubusercontent.com/georgegillams/dotfiles/master/greasemonkey/${fileName}`,
    path.join(__dirname, "./server_content/greasemonkey", fileName),
    {}
  );
  download.on("end", () => {
    res.sendFile(
      path.join(__dirname, "./server_content/greasemonkey", fileName),
      {
        headers: { "Content-Type": "text/plain" }
      }
    );
  });
}

router.get("/greasemonkey/find_backpack_components", (req, res) => {
  sendGreasemonkeyFile("Find Backpack components.js", req, res);
});

router.get("/greasemonkey/github_travis_new_tab", (req, res) => {
  sendGreasemonkeyFile("GitHub Travis links new tab.js", req, res);
});

router.get("/greasemonkey/github_squash_reminder", (req, res) => {
  sendGreasemonkeyFile("GitHub squash reminder.js", req, res);
});

router.get("/greasemonkey/gurushots_boost", (req, res) => {
  sendGreasemonkeyFile("GuruShots boost.js", req, res);
});

router.get("/greasemonkey/secureEcs_download", (req, res) => {
  sendGreasemonkeyFile("secure ecs.js", req, res);
});

router.get("/greasemonkey/skyscanner_buttons", (req, res) => {
  sendGreasemonkeyFile("skyscanner buttons.js", req, res);
});

router.get("/greasemonkey/github_highlight_name", (req, res) => {
  sendGreasemonkeyFile("Github highlight my name.js", req, res);
});

router.get("/greasemonkey/github_expand_comments", (req, res) => {
  sendGreasemonkeyFile("Github expand all hidden comments.js", req, res);
});

router.get("/greasemonkey/hackthis_coding_1", (req, res) => {
  sendGreasemonkeyFile("Hackthis.co.uk coding level 1.js", req, res);
});

router.get("/greasemonkey/hackthis_coding_2", (req, res) => {
  sendGreasemonkeyFile("Hackthis.co.uk coding level 2.js", req, res);
});

export default router;
