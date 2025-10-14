from BaseClasses import CollectionState


def canAccessIncoherentInterview(state: CollectionState, player: int) -> bool:
    # More arguments above are free to choose, since you can expect this is only called in your world
    # MultiWorld can be accessed through state.multiworld.
    # Explicitly passing in MyGameWorld instance for easy options access is also a valid approach, but it's generally
    # better to check options before rule assignment since the individual functions can be called thousands of times
    return ((state.can_reach_entrance("Clemens First Chat Warp", player)) or ((state.has("Jokzi Ozo: Hunger Mask", player)) and state.can_reach_entrance("Their Vessel -> First Chat", player)) or (state.can_reach_entrance("Vessel Surface -> First Chat", player))) and state.has("First Chat: Be Honest", player)

def canAccessIncoherentDullVessel(state: CollectionState, player: int) -> bool:
    # More arguments above are free to choose, since you can expect this is only called in your world
    # MultiWorld can be accessed through state.multiworld.
    # Explicitly passing in MyGameWorld instance for easy options access is also a valid approach, but it's generally
    # better to check options before rule assignment since the individual functions can be called thousands of times
    return ((state.has("Menu: EP1 Fed", player)) and state.has("Jokzi Ozo: Hunger Mask", player)) or (state.can_reach_entrance("!!__REFERENTIAL SCAR__!! (to Dull Vessel)", player)) or state.can_reach_region("Beneath", player)

def canAccessCityStreetOffice(state: CollectionState, player: int) -> bool:
    # More arguments above are free to choose, since you can expect this is only called in your world
    # MultiWorld can be accessed through state.multiworld.
    # Explicitly passing in MyGameWorld instance for easy options access is also a valid approach, but it's generally
    # better to check options before rule assignment since the individual functions can be called thousands of times
    return (state.has("Jokzi Ozo: Joy Mask", player) or state.can_reach_entrance("!!__REFERENTIAL SCAR__!! (to City Streets)", player))

def canAccessCityStreetIsabel(state: CollectionState, player: int) -> bool:
    # More arguments above are free to choose, since you can expect this is only called in your world
    # MultiWorld can be accessed through state.multiworld.
    # Explicitly passing in MyGameWorld instance for easy options access is also a valid approach, but it's generally
    # better to check options before rule assignment since the individual functions can be called thousands of times
    return ((state.can_reach_entrance("Beneath -> City Streets", player)) or (state.has("Menu: EP2 Intro", player)) or (state.can_reach_entrance("Car -> City Streets", player)) or ((state.can_reach_entrance("Aquarium -> City Streets", player))))

def canAccessCityStreetDocksFlip(state: CollectionState, player: int) -> bool:
    # More arguments above are free to choose, since you can expect this is only called in your world
    # MultiWorld can be accessed through state.multiworld.
    # Explicitly passing in MyGameWorld instance for easy options access is also a valid approach, but it's generally
    # better to check options before rule assignment since the individual functions can be called thousands of times
    return (state.can_reach_entrance("Beneath -> City Streets", player)) or (canAccessCityStreetIsabel(state, player) and state.has("Jokzi Ozo: Hunger Mask", player))

def canAccessOzoDarkRoom(state: CollectionState, player: int) -> bool:
    # More arguments above are free to choose, since you can expect this is only called in your world
    # MultiWorld can be accessed through state.multiworld.
    # Explicitly passing in MyGameWorld instance for easy options access is also a valid approach, but it's generally
    # better to check options before rule assignment since the individual functions can be called thousands of times
    return state.has("City Streets: Isabel Unitied", player) or (state.can_reach_entrance("Car -> Jokzi Ozo", player))