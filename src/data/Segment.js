const SEGMENT = {
    start: {
        location: null,
        locationName: null,
        walkable: null,
        points: null
    },
    end: {
        location: null,
        locationName: null,
        walkable: null,
        points: null
    },
    info: {
        mount_subgr: null,
        isOfficial: null,
        duration: null,
        length: null,
        color_trail: null
    }
}

export function segmentToPost() {
    const result = {
        name: SEGMENT.start.locationName + " - " + SEGMENT.end.locationName,
        isOfficial: SEGMENT.info.isOfficial,
        duration: SEGMENT.info.duration, length: SEGMENT.info.duration,
        color_trail: SEGMENT.info.color_trail,
        mount_subgr: SEGMENT.info.mount_subgr
    };

    result.end1 = {
        points1: SEGMENT.start.points,
        walkable1: SEGMENT.start.walkable,
        hightSum1: 0,
        location1: SEGMENT.start.location
    }

    result.end2 = {
        points2: SEGMENT.end.points,
        walkable2: SEGMENT.end.walkable,
        hightSum2: 0,
        location2: SEGMENT.end.location
    }
    
    return result;
}

export default SEGMENT;