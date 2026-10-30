import React from 'react';

interface MapEmbedProps {
  embedUrl: string;
  title?: string;
  className?: string;
}

/**
 * Komponen Peta Interaktif / Embed Google Maps (Server Component)
 */
export default function MapEmbed({
  embedUrl,
  title = 'Lokasi SDN Jatipulo 07 Jakarta',
  className = '',
}: MapEmbedProps) {
  return (
    <div className={`map-container aspect-video w-full overflow-hidden rounded ${className}`}>
      <iframe
        src={embedUrl}
        title={title}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
