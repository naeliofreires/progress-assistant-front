const getDefaultAnimationOptions = (animationData: any) => ({
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
});

export const AnimationUtil = {
  getDefaultAnimationOptions,
};
