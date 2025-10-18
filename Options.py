from dataclasses import dataclass

from Options import Toggle, Range, Choice, OptionSet, Visibility, PerGameCommonOptions

modsList = ["obski", "surfacerunning", "quiz", "maze", "kotzu", "humoroushumors", "vielk", "theirstreets", "mothlobotomy", "councilaltdance"]

class Scansanity(Toggle):
    """Whether to use entity scans as valid options and checks or not."""
    visibility = Visibility.all
    internal_name = "scansanity"
    display_name = "Scansanity"

class Mods(OptionSet):
    """List of mods that will be included in the shuffling.
    Supported mods:
    obski
    surfacerunning
    quiz
    maze
    kotzu
    humoroushumors
    vielk
    theirstreets (only with scansanity)
    mothlobotomy
    councilaltdance"""
    visibility = Visibility.all & ~Visibility.simple_ui
    internal_name = "mods"
    display_name = "Mods"
    validkeys = modsList


@dataclass
class CorruObserverOptions(PerGameCommonOptions):
    scansanity: Scansanity
    mods: Mods