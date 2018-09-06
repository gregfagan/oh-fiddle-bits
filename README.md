# oh-fiddle-bits

A collection of tools for violin/fiddle players. Built for the web, using React and Web Audio.

### Tools

- _tune_: a tuner, see notes below.
- _tone_: a tone generator, usually for playing A440.
- _beat_: a metronome, **not yet implemented**.

### Goal

I started learning to play fiddle recently, and needed some common tools.

Although there are many software versions of these tools on the web and through native apps, most of them don't target violin players specifically.

Instruments like the piano and guitar are commonly tuned according to a [twelve-tone equal temperament](https://en.wikipedia.org/wiki/Equal_temperament) system, but violins often tune their strings in a [just temperament](http://pages.mtu.edu/~suits/scales.html) 3:2 perfect fifth interval, which means that the G, D, and E open strings are at slightly different frequencies to their equal-tempered counterparts.

This project exists as an exercise to become acquianted with the Web Audio API and to build a tuner with a just temperament option. The other tools are mainly for convenience.

### Tuner

The app is a work in progress, and the tuner is currently not very functional. For pitch detection, it currently implements a simple autocorrelation algorithm derived from [this](https://developer.microsoft.com/en-us/microsoft-edge/testdrive/demos/webaudiotuner/) Web Audio demonstration. It isn't sufficient for the task and I'm exploring alternatives.

Despite the primary goal, I've only implemented an equal-temperament system until I have more accurate pitch detection.

### Development

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). All relevant information about building and running this project can be found in the Create React App README.
