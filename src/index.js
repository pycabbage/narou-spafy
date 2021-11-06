const _move = (pathname, selector) => {
  console.log("move to ", pathname);
  fetch(pathname)
    .then((res) => res.text())
    .then((txt) => {
      f = new DOMParser().parseFromString(txt, "text/html");
      fc = f.querySelector(selector);
      dc = document.querySelector(selector);
      dc.innerHTML = fc.innerHTML;
      history.pushState("", "", pathname);
      convert_link();
    });
};

const episode_to_episode = (
  ep,
  selector = "div#novel_contents div#novel_color"
) => {
  _e2e_uri = new URL(document.URL);
  _e2e_uri.pathname = _e2e_uri.pathname.replace(/\/\d+/, `/${ep}`);
  _move(_e2e_uri.pathname, selector);
};
const index_to_episode = (ep) => {
  _i2e_uri = new URL(document.URL);
  _i2e_uri.pathname += `${ep}/`
  _move(_i2e_uri.pathname, (selector = "div#container"));
}
const episode_to_index = (ncode) => _move(`/${ncode}/`, "div#container");
const index_to_index = (ncode) => _move(`/${ncode}/`, "div#container");

const convert_link = (selector = "div#container a") => {
  [...document.querySelectorAll(selector)].map((d) => {
    uri = new URL(document.URL);
    if (d.attributes.href.value[0] === "#") return;
    du = new URL(d.href);
    if (uri.origin === du.origin) {
      if (du.pathname.match(/n.{6}\/\d+/)) {  
        d.addEventListener("click", (e) => {
          e.stopPropagation();
          e.preventDefault();
          target = new URL(d.href).pathname.match(/\/(\d+)\//)[1];
          if (uri.pathname.match(/\/n.{6}\/$/)) {
            console.log("index_to_episode");
            index_to_episode(Number(target));
          } else {  // case: in episode now
            console.log("episode_to_episode");
            episode_to_episode(Number(target));
          }
        });
      } else if (du.pathname.match(/n.{6}\/$/)) {
        d.addEventListener("click", (e) => {
          e.stopPropagation();
          e.preventDefault();
          target = new URL(d.href).pathname.match(/(n.{6})\//)[1];
          if (uri.pathname.match(/\/n.{6}\/$/)) {
            index_to_index(target);
          } else {
            episode_to_index(target);
          }
        });
      }
    }
  });
};

(()=>{
  convert_link();
})();
