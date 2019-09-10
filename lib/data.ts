async function getPageData(href): Promise<any> {
  const { host } = window.location;
  let isDev = host.includes("localhost");
  let splitHost = host.split(".");

  if ((!isDev && splitHost.length === 3) || (isDev && splitHost.length === 2)) {
    let page = splitHost[0];
    if (page === "www") {
      return null;
    }
    let res = await fetch(`/api/get-page?page=${page}`);
    console.log({ res });

    if (res.status === 200) {
      let { html, allowEdit, token } = await res.json();
      return { html, allowEdit, token };
    }

    if (res.status === 404) {
      let { html, token } = await res.json();
      return { html, editLink: `${href}?edit=${token}` };
    }

    if (!res.ok && res.status !== 404) {
      let { stack, message } = await res.json();
      return { errorCode: res.status, stack, message };
    }
  }
}

const defaultMarkup = `
<h1>Welcome to<br> static.fun!</h1>
<marquee>hack and be merry <3</marquee>
<img src="https://media.giphy.com/media/h4lhtypKce2GHbfili/giphy.gif" />
<style>
  * {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  }
  body {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
  }
  h1 {
    color: salmon;
    font-size: 64px
  }
  img {
    height: 256px;
    width: auto;
    margin-top: 24px;
  }
  marquee {
    width: fit-content;
    background: salmon;
    color: black;
    font-family: "Comic Sans MS";
    padding: 10px;
    text-transform: black;
    border: 3px solid black;
  }
  }
</style>



`;

export { getPageData, defaultMarkup };
