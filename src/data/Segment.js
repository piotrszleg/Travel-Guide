const SEGMENT = {
    start: {
        location: null,
        locationName: null,
        walkable: true,
        points: 0
    },
    end: {
        location: null,
        locationName: null,
        walkable: true,
        points: 0
    },
    info: {
        mount_subgr: null,
        isOfficial: true,
        duration: 0,
        length: 0,
        color_trail: null
    }
}

export function segmentToPost() {
    const result = {
        name:     SEGMENT.start.locations.find(l=>l.content==SEGMENT.start.location).name 
        + " - " + SEGMENT.end.locations.find(l=>l.content==SEGMENT.end.location).name,
        isOfficial: SEGMENT.info.isOfficial ? true : false,
        duration: SEGMENT.info.duration ?? 0, 
        length: SEGMENT.info.length ?? 0,
        color_trail: SEGMENT.info.color_trail,
        mount_subgr: SEGMENT.info.mount_subgr
    };

    result.end1 = {
        points1: SEGMENT.start.points ?? 0,
        walkable1: SEGMENT.start.walkable ? true : false,
        hightSum1: 0,
        location1: SEGMENT.start.location
    }

    result.end2 = {
        points2: SEGMENT.end.points ?? 0,
        walkable2: SEGMENT.end.walkable ? true : false,
        hightSum2: 0,
        location2: SEGMENT.end.location
    }
    
    return result;
}

export default SEGMENT;