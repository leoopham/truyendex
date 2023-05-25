"use client"

import { useEffect } from "react";
import useLastUpdates from "../../hooks/useLastUpdates"
import { useMangadex } from "../../contexts/mangadex";
import getCoverArt from "../../utils/getCoverArt";
import Image from "next/image";

export default function LastUpdates() {
    const { chapters, isLoading, error } = useLastUpdates();
    const { mangas, addMultipleMangas } = useMangadex()

    console.log('logs d5d8654e-67a8-4cda-9249-698592fffbb9', mangas['d5d8654e-67a8-4cda-9249-698592fffbb9'])
    useEffect(() => {
        if (chapters?.length > 0) {
            addMultipleMangas({ ids: chapters.filter(c => !!c?.manga?.id).map(c => c.manga?.id!) })
        }
    }, [chapters])

    if (isLoading) return <div>loading...</div>;
    if (error) return <div>error</div>;

    return (
        <div className="grid grid-cols-4">
            {
                chapters.map(chapter => (
                    <div key={chapter.id}>
                        {chapter.id}
                        {
                            chapter.manga &&
                            <img alt="" src={getCoverArt(mangas[chapter.manga.id])} />
                        }
                        {chapter.manga && getCoverArt(mangas[chapter.manga.id])}
                    </div>
                ))
            }
        </div>
    )
}