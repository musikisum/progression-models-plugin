class ServerTimeController {
  handleGetServerTime(_req, res) {
    return res.send({ time: new Date() });
  }

  registerMiddleware(router) {
    router.get(
      '/api/v1/plugin/educandu/educandu-plugin-example/time',
      (req, res) => this.handleGetServerTime(req, res)
    );
  }
}

export default ServerTimeController;
