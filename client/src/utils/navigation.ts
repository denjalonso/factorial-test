export const navigateToPath = (path: string, delay?: number) => {
  if (delay) {
    setTimeout(
      // TODO this is some pretty hacky routing right here, revisit this
      () => {
        window.location.pathname = path;
      },
      1000,
    );
  } else {
    window.location.pathname = path;
  }
};
