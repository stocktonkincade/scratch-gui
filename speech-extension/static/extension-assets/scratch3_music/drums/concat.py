from pydub import AudioSegment

snare = AudioSegment.from_mp3("1-snare.mp3")
bass = AudioSegment.from_mp3("2-bass-drum.mp3")

combo = snare + bass
combo.export("combo.mp3", format="mp3")

